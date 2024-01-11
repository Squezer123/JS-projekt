class OverworldMap {
  constructor(config) {
    this.overworld = null;
    this.gameObjects = config.gameObjects || {};
    this.cutsceneSpaces = config.cutsceneSpaces || {};
    this.walls = config.walls || {};
    this.polygon = config.polygon || [];

    this.lowerImage = new Image();
    this.lowerImage.src = config.lowerSrc;

    this.upperImage = new Image();
    this.upperImage.src = config.upperSrc;

    this.isCutscenePlaying = false;


  }

  drawLowerImage(ctx, cameraPerson) {
    ctx.drawImage(this.lowerImage, utils.withGrid(6.5)- cameraPerson.x, utils.withGrid(4)- cameraPerson.y)
  }

  drawUpperImage(ctx, cameraPerson) {
    ctx.drawImage(this.upperImage, utils.withGrid(10.5)- cameraPerson.x, utils.withGrid(6)- cameraPerson.y)
  }
  
  isSpaceTaken(currX, currY, direction){
    const {x,y} = utils.nextPosition(currX,currY,direction);
    return this.walls[`${x},${y}`] || false;
  }
  isPointInPolygon(currX, currY, direction){
    const {x,y} = utils.nextPosition(currX,currY,direction);
    let point = [];
    point[1] = x/16;
    point[0] = y/16;
    let polygon = this.polygon;
        //A point is in a polygon if a line from the point to infinity crosses the polygon an odd number of times
        let odd = false;
        //For each edge (In this case for each point of the polygon and the previous one)
        for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
            //If a line from the point into infinity crosses this edge
            if (((polygon[i][1] > point[1]) !== (polygon[j][1] > point[1])) // One point needs to be above, one below our y coordinate
                // ...and the edge doesn't cross our Y corrdinate before our x coordinate (but between our x coordinate and infinity)
                && (point[0] < ((polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0]))) {
                // Invert odd
                odd = !odd;
            }
            j = i;
    
        }
        //If the number of crossings was odd, the point is in the polygon
        return odd;
       
   
}
  mountObjects() {
    Object.keys(this.gameObjects).forEach(key => {
      let object = this.gameObjects[key];
      object.id = key;


      object.mount(this);
    })
  }


  async startCutscene(events){
    this.isCutscenePlaying = true;
    for(let i=0; i<events.length; i++){
      const eventHandler = new OverworldEvent({
        event: events[i],
        map: this,
      })
      await eventHandler.init()
    }

    this.isCutscenePlaying = false;

    Object.values(this.gameObjects).forEach(object => object.doBehaviorEvent(this))

  }

  checkForActionCutscene(){
    const hero = this.gameObjects["hero"];
    const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction);
    const match = Object.values(this.gameObjects).find(object => {
      return `${object.x},${object.y}` === `${nextCoords.x},${nextCoords.y}`
    });
    if(!this.isCutscenePlaying && match && match.talking.length) {
      this.startCutscene(match.talking[0].events)
    }
  }

  checkForFootstepCutscene(){
    const hero = this.gameObjects["hero"];
    const match = this.cutsceneSpaces[`${hero.x},${hero.y}`];
    if(!this.isCutscenePlaying && match){
      this.startCutscene(match[0].events);
    }
  }

 

  AddHero(hero){
    this.gameObjects.hero = hero;
    this.gameObjects.hero.x = utils.withGrid(1);
    this.gameObjects.hero.y = utils.withGrid(1);
  }
  addWall(x,y) {
    this.walls[`${x},${y}`] = true;
  }
  removeWall(x,y) {
    delete this.walls[`${x},${y}`]
  }
  moveWall(wasX, wasY, direction) {
    this.removeWall(wasX, wasY);
    const {x,y} = utils.nextPosition(wasX, wasY, direction);
    this.addWall(x,y);
  }

}

window.OverworldMaps = {
  Lobby: {
    lowerSrc: "Assets/map.png",
    upperSrc: "Assets/map.png",
    gameObjects: {
      enemy1: new Person({
        id: "c001",
        x: utils.withGrid(5),
        y: utils.withGrid(6),
      
        talking: [
          {
            events: [
              {type: "textMessage", text:"Hello There", faceHero: "enemy1"},
              {type: "fight", enemyId: "c001",mapId: "enemy1"}
            ]
          }
        ]
      }),
      enemy2: new Person({
        id: "c001",
        x: utils.withGrid(7),
        y: utils.withGrid(7),
      
        talking: [
          {
            events: [
              {type: "textMessage", text:"Hello There", faceHero: "enemy2"},
              {type: "fight", enemyId: "c001",mapId: "enemy2"}
            ]
          }
        ]
      }),
      chest: new GameObject({
        id: "chest",
        x: utils.withGrid(7),
        y: utils.withGrid(1),
        src: "Assets/items/mini_chest/mini_chest_3.png",
        isObject: true,
        inventory: [
          new Item({})
         ], 
        talking: [
          {
            events: [
              {type: "textMessage", text:"Inventory comming soon", faceHero: "chest"},
              {type: "PickItem", faceHero: "chest"}
            ]
          }
        ]
      })
    },
    walls:{
    },
    cutsceneSpaces: {
      [utils.asGridCoords(3,6)]: [
          {
            events: [
              {who: "hero", type: "stand", direction: "right"},
              {type: "textMessage", text:"Once you go in there, it may be hard to come back...", faceHero: "enemy1"},
              {type: "enterDungeon", map:"Room"},
            ]
        }
      ],

    },
    polygon:[
      [1,1],
      [1,9],
      [9,9],
      [9,1]
    ]
  },
  Dungeon: {
    lowerSrc: "Assets/dungeon.png",
    upperSrc: "Assets/test.png",
    gameObjects: {
      key: new GameObject({
        id: "key",
        x: utils.withGrid(7),
        y: utils.withGrid(7),
        src: "Assets/items/keys/keys_1_1.png",
        isObject: true,
        inventory: [
          new Item({
            id: 1,
            name: "key",
            amount: 1,
            description:"Lets you leave dungeon",
            src: "Assets/items/keys/keys_1_1.png"
          })
         ], 
        talking: [
          {
            events: [
              {type: "PickItem", faceHero: "key"}
            ]
          }
        ]
      })
    },
    walls:{
      [utils.asGridCoords(8,3)]: true,
      [utils.asGridCoords(7,3)]: true,
      [utils.asGridCoords(6,3)]: true,
      [utils.asGridCoords(5,3)]: true,
      [utils.asGridCoords(4,3)]: true,
      [utils.asGridCoords(3,3)]: true,
      

    },
    cutsceneSpaces: {
      [utils.asGridCoords(8,4)]: [
        {
          events: [
            {type: "changeMap", map: "Lobby"},
          ]
      }
    ],
    [utils.asGridCoords(8,5)]: [
      {
        events: [
          {type: "changeMap", map: "Lobby"},
        ]
    }
  ],
    
    },
    polygon:[
      [1,1],
      [1,9],
      [9,9],
      [9,1]
    ]
  },

  Room: {
    lowerSrc: "Assets/Rooms/room4UDRL.png",
    upperSrc: "Assets/test.png",
    gameObjects: {
      key: new GameObject({
        id: "key",
        name: "key",
        x: utils.withGrid(1),
        y: utils.withGrid(2),
        src: "Assets/items/keys/keys_1_1.png",
        isObject: true,
        inventory: [
          new Item({
            id: 1,
            name: "key",
            amount: 1,
            description:"Lets you leave dungeon",
            src: "Assets/items/keys/keys_1_1.png"
          })
         ], 
        talking: [
          {
            events: [
              {type: "PickItem", faceHero: "key"}
            ]
          }
        ]
      }),
      
    },
    walls:{
    },
    cutsceneSpaces: {
      [utils.asGridCoords(2,0)]: [
        {
          events: [
            {type: "changeRoom", map:"Room", direction: "up"},
          ]
      }
    ],
    },
    polygon:[
      [0,0],
      [0,6],
      [6,6],
      [6,0]
    ]
  },
}