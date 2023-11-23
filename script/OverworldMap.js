class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.walls = config.walls || {};
        this.polygon = config.polygon || {};
        this.backgroundImage = new Image();
        this.backgroundImage.src = config.backgroundSrc;

        this.isCutscenePlaying = false;
    }

    drawBackgroundImage(ctx){
        ctx.drawImage(this.backgroundImage, 0, 0);
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

    addWall(x,y){
        // let newX= x+100;
        // let newY= y+20
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

    mountObjects() {
        Object.keys(this.gameObjects).forEach(key => {
    
          let object = this.gameObjects[key];
          object.id = key;
    
          this.gameObjects.player.x
          object.mount(this);
    
        })
      }


    addGameObject(objX, objY, src) {
        let x = utils.withGrid(objX);
        let y = utils.withGrid(objY);
        const newGameObject = new GameObject({
            x: x+18,
            y: y+25,
            src: src,
            isThisObject: true,
            inventory: new Item({}),
        });

        this.gameObjects['flask'] = newGameObject;
        this.addWall(x, y);

        return newGameObject;
    }
    generateObjects() {
        let src = 'Assets/items/flasks/flasks_1_1.png';
        let usedPairs = [];
    
        for (let i = 0; i < 3; i++) {
            let x, y;
            
            do {
                x = Math.floor(Math.random() * 5) + 1;
                y = Math.floor(Math.random() * 5) + 1;
            } while (usedPairs.some(pair => pair.x === x && pair.y === y));

            usedPairs.push({ x, y });
    
            this.addGameObject(x, y, src);
        }
    }
    
}


window.OverworldMaps = {
    DemoRoom:{
        backgroundSrc: "Assets/test.png",
        gameObjects: {
            player: new Person({
                id: "player",
                isThisObject: false,
                isPlayerControlled: true,
                x: utils.withGrid(0),
                y: utils.withGrid(0),
            }),
            npc: new Person({
                id: "npc",
                isThisObject: false,
                isPlayerControlled: false,
                x: utils.withGrid(5),
                y: utils.withGrid(4),
                behaviorLoop: [
                    {type: "walk", direction: "left"},
                    {type: "walk", direction: "down"},
                    {type: "walk", direction: "right"},
                    {type: "walk", direction: "up"},
                ]
            }),
            mark: new GameObject({
                id: "mark",
                src: "Assets/mark.png",
                isThisObject: true,
                isThisMark: true,
                isPlayerControlled: false,
                x: utils.withGrid(0),
                y: utils.withGrid(1),
            }),
        },
        
        walls:{
        

        },
        polygon:[
            [0,0],
            [0,8],
            [6,8],
            [6,0]

        ]
        
}}
