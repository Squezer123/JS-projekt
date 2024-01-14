window.Rooms = {
    "room1D": {
        enemies:{
            enemy1: new Person({
                id: "Skeleton",
                src: "Assets/skeleton.png",
                onCooldown: [],
                x: utils.withGrid(1),
                y: utils.withGrid(3),
              
                talking: [
                  {
                    events: [
                      {type: "fight", enemyId: "Skeleton",mapId: "enemy1"}
                    ]
                  }
                ]
              }),
        },
        lowerSrc: "Assets/Rooms/room1D.png",
        upperSrc: "Assets/test.png",
        walls:{
            [utils.asGridCoords(2,3)]: true,
            [utils.asGridCoords(3,3)]: true,
            [utils.asGridCoords(4,3)]: true,
            [utils.asGridCoords(5,3)]: true,
        },
        cutsceneSpaces: {},
        polygon:[
            [1,1],
            [1,6],
            [6,6],
            [6,1]
          ]
    },
    "room1L":{
        enemies:{
            enemy1: new Person({
                id: "vampire",
                src: "Assets/vampire.png",
                onCooldown: [],
                x: utils.withGrid(3),
                y: utils.withGrid(1),
              
                talking: [
                  {
                    events: [
                      {type: "fight", enemyId: "Vampire",mapId: "enemy1"}
                    ]
                  }
                ]
              }),
        },
        lowerSrc: "Assets/Rooms/room1L.png",
        upperSrc: "Assets/test.png",
        walls:{
            [utils.asGridCoords(4,1)]: true,
            [utils.asGridCoords(4,2)]: true,
            [utils.asGridCoords(4,3)]: true,
            [utils.asGridCoords(4,4)]: true,
            [utils.asGridCoords(2,2)]: true,
            [utils.asGridCoords(1,2)]: true,
            [utils.asGridCoords(2,4)]: true,
            [utils.asGridCoords(1,4)]: true,
        },
        cutsceneSpaces: {},
        polygon:[
            [1,1],
            [1,6],
            [6,6],
            [6,1]
          ]
    },
    "room1R":{
        enemies:{
            enemy1: new Person({
                id: "Skull",
                src: "Assets/skull.png",
                onCooldown: [],
                x: utils.withGrid(2),
                y: utils.withGrid(4),
              
                talking: [
                  {
                    events: [
                      {type: "fight", enemyId: "Skull",mapId: "enemy1"}
                    ]
                  }
                ]
              }),
              enemy2: new Person({
                id: "Skeleton",
                src: "Assets/skeleton.png",
                onCooldown: [],
                x: utils.withGrid(4),
                y: utils.withGrid(2),
              
                talking: [
                  {
                    events: [
                      {type: "fight", enemyId: "Skeleton",mapId: "enemy2"}
                    ]
                  }
                ]
              }),
        },
        lowerSrc: "Assets/Rooms/room1R.png",
        upperSrc: "Assets/test.png",
        walls:{
            [utils.asGridCoords(5,1)]: true,
            [utils.asGridCoords(5,2)]: true,
            [utils.asGridCoords(5,4)]: true,
            [utils.asGridCoords(1,2)]: true,
            [utils.asGridCoords(2,2)]: true,
            [utils.asGridCoords(3,2)]: true,
            [utils.asGridCoords(4,4)]: true,
            [utils.asGridCoords(4,5)]: true,
            
        },
        cutsceneSpaces: {},
        polygon:[
            [1,1],
            [1,6],
            [6,6],
            [6,1]
          ]
    },
    "room1U":{
        enemies:{
            enemy1: new Person({
                id: "GoblinR",
                src: "Assets/goblinR.png",
                onCooldown: [],
                x: utils.withGrid(1),
                y: utils.withGrid(2),
              
                talking: [
                  {
                    events: [
                      {type: "fight", enemyId: "GoblinR",mapId: "enemy1"}
                    ]
                  }
                ]
              }),
              enemy2: new Person({
                id: "GoblinR",
                src: "Assets/goblinR.png",
                onCooldown: [],
                x: utils.withGrid(1),
                y: utils.withGrid(4),
              
                talking: [
                  {
                    events: [
                      {type: "fight", enemyId: "GoblinR",mapId: "enemy2"}
                    ]
                  }
                ]
              }),
              enemy3: new Person({
                id: "GoblinL",
                src: "Assets/goblinL.png",
                onCooldown: [],
                x: utils.withGrid(4),
                y: utils.withGrid(2),
              
                talking: [
                  {
                    events: [
                      {type: "fight", enemyId: "GoblinL",mapId: "enemy3"}
                    ]
                  }
                ]
              }),
        },
        lowerSrc: "Assets/Rooms/room1U.png",
        upperSrc: "Assets/test.png",
        walls:{
            [utils.asGridCoords(3,4)]: true,
            [utils.asGridCoords(3,4)]: true,
            [utils.asGridCoords(4,4)]: true,
            [utils.asGridCoords(5,4)]: true,
            
        },
        cutsceneSpaces: {},
        polygon:[
            [1,1],
            [1,6],
            [6,6],
            [6,1]
          ]
    },
    "room2DL":{
        enemies:{
            enemy1: new Person({
                id: "Vampire",
                src: "Assets/vampire.png",
                onCooldown: [],
                x: utils.withGrid(3),
                y: utils.withGrid(2),
              
                talking: [
                  {
                    events: [
                      {type: "fight", enemyId: "Vampire",mapId: "enemy1"}
                    ]
                  }
                ]
              }),
        },
        lowerSrc: "Assets/Rooms/room2DL.png",
        upperSrc: "Assets/test.png",
        walls:{
            [utils.asGridCoords(1,1)]: true,
            [utils.asGridCoords(1,2)]: true,
            [utils.asGridCoords(1,4)]: true,
            [utils.asGridCoords(2,2)]: true,
            [utils.asGridCoords(2,4)]: true,
            [utils.asGridCoords(4,2)]: true,
            [utils.asGridCoords(4,3)]: true,
            [utils.asGridCoords(4,4)]: true,
            [utils.asGridCoords(5,2)]: true,
            [utils.asGridCoords(5,4)]: true,
        },
        cutsceneSpaces: {},
        polygon:[
            [1,1],
            [1,6],
            [6,6],
            [6,1]
          ]
    },
    "room2DR":{
        enemies:{
            enemy1: new Person({
                id: "Skeleton",
                src: "Assets/skeleton.png",
                onCooldown: [],
                x: utils.withGrid(3),
                y: utils.withGrid(2),
              
                talking: [
                  {
                    events: [
                      {type: "fight", enemyId: "Skeleton",mapId: "enemy1"}
                    ]
                  }
                ]
              }),
            
        },
        lowerSrc: "Assets/Rooms/room2DR.png",
        upperSrc: "Assets/test.png",
        walls:{
            [utils.asGridCoords(1,3)]: true,
            [utils.asGridCoords(2,3)]: true,
            [utils.asGridCoords(2,4)]: true,
            [utils.asGridCoords(2,5)]: true,
            [utils.asGridCoords(4,2)]: true,
            [utils.asGridCoords(4,5)]: true,
            [utils.asGridCoords(5,2)]: true,
            [utils.asGridCoords(5,5)]: true,
        },
        cutsceneSpaces: {},
        polygon:[
            [1,1],
            [1,6],
            [6,6],
            [6,1]
          ]
    },
    "room2RL":{
        enemies:{
            enemy1: new Person({
                id: "DeathMage",
                src: "Assets/deathmage.png",
                onCooldown: [],
                x: utils.withGrid(3),
                y: utils.withGrid(2),
              
                talking: [
                  {
                    events: [
                      {type: "fight", enemyId: "DeathMage",mapId: "enemy1"}
                    ]
                  }
                ]
              }),
        },
        lowerSrc: "Assets/Rooms/room2RL.png",
        upperSrc: "Assets/test.png",
        walls:{
            [utils.asGridCoords(1,2)]: true,
            [utils.asGridCoords(2,2)]: true,
            [utils.asGridCoords(4,2)]: true,
            [utils.asGridCoords(5,2)]: true,
        },
        cutsceneSpaces: {},
        polygon:[
            [1,1],
            [1,5],
            [6,5],
            [6,1]
          ]
    },
    "room2UD":{
        enemies:{
            enemy1: new Person({
                id: "Vampire",
                src: "Assets/vampire.png",
                onCooldown: [],
                x: utils.withGrid(1),
                y: utils.withGrid(1),
              
                talking: [
                  {
                    events: [
                      {type: "fight", enemyId: "Vampire",mapId: "enemy1"}
                    ]
                  }
                ]
              }),
              enemy2: new Person({
                id: "Skeleton",
                src: "Assets/skeleton.png",
                onCooldown: [],
                x: utils.withGrid(5),
                y: utils.withGrid(4),
              
                talking: [
                  {
                    events: [
                      {type: "fight", enemyId: "Skeleton",mapId: "enemy2"}
                    ]
                  }
                ]
              }),
        },
        lowerSrc: "Assets/Rooms/room2UD.png",
        upperSrc: "Assets/test.png",
        walls:{
            [utils.asGridCoords(1,2)]: true,
            [utils.asGridCoords(2,2)]: true,
            [utils.asGridCoords(4,2)]: true,
            [utils.asGridCoords(5,2)]: true,
        },
        cutsceneSpaces: {},
        polygon:[
            [1,1],
            [1,6],
            [6,6],
            [6,1]
          ]
    },
    "room2UL":{
        enemies:{
            enemy1: new Person({
                id: "DeathMage",
                src: "Assets/deathmage.png",
                onCooldown: [],
                x: utils.withGrid(3),
                y: utils.withGrid(4),
              
                talking: [
                  {
                    events: [
                      {type: "fight", enemyId: "DeathMage",mapId: "enemy1"}
                    ]
                  }
                ]
              }),
              
        },
        lowerSrc: "Assets/Rooms/room2UL.png",
        upperSrc: "Assets/test.png",
        walls:{
            [utils.asGridCoords(1,2)]: true,
            [utils.asGridCoords(1,4)]: true,
            [utils.asGridCoords(2,1)]: true,
            [utils.asGridCoords(2,2)]: true,
            [utils.asGridCoords(2,4)]: true,
            [utils.asGridCoords(2,5)]: true,
            [utils.asGridCoords(4,4)]: true,
            [utils.asGridCoords(5,4)]: true,
        },
        cutsceneSpaces: {},
        polygon:[
            [1,1],
            [1,6],
            [6,6],
            [6,1]
          ]
    },
    "room2UR":{
        enemies:{
            enemy1: new Person({
                id: "GoblinR",
                src: "Assets/goblinR.png",
                onCooldown: [],
                x: utils.withGrid(1),
                y: utils.withGrid(2),
              
                talking: [
                  {
                    events: [
                      {type: "fight", enemyId: "GoblinR",mapId: "enemy1"}
                    ]
                  }
                ]
              }),
              enemy2: new Person({
                id: "GoblinR",
                src: "Assets/goblinR.png",
                onCooldown: [],
                x: utils.withGrid(2),
                y: utils.withGrid(4),
              
                talking: [
                  {
                    events: [
                      {type: "fight", enemyId: "GoblinR",mapId: "enemy2"}
                    ]
                  }
                ]
              }),
        },
        lowerSrc: "Assets/Rooms/room2UR.png",
        upperSrc: "Assets/test.png",
        walls:{
            [utils.asGridCoords(3,4)]: true,
            [utils.asGridCoords(3,5)]: true,
            [utils.asGridCoords(4,1)]: true,
            [utils.asGridCoords(4,2)]: true,
            [utils.asGridCoords(4,4)]: true,
            [utils.asGridCoords(5,2)]: true,
            [utils.asGridCoords(5,4)]: true,
        },
        cutsceneSpaces: {},
        polygon:[
            [1,1],
            [1,6],
            [6,6],
            [6,1]
          ]
    },
    "room3DRL":{
        enemies:{
            enemy1: new Person({
                id: "DeathMage",
                src: "Assets/deathmage.png",
                onCooldown: [],
                x: utils.withGrid(4),
                y: utils.withGrid(2),
              
                talking: [
                  {
                    events: [
                      {type: "fight", enemyId: "DeathMage",mapId: "enemy1"}
                    ]
                  }
                ]
              }),
              enemy2: new Person({
                id: "Skeleton",
                src: "Assets/skeleton.png",
                onCooldown: [],
                x: utils.withGrid(2),
                y: utils.withGrid(4),
              
                talking: [
                  {
                    events: [
                      {type: "fight", enemyId: "Skeleton",mapId: "enemy2"}
                    ]
                  }
                ]
              }),
        },
        lowerSrc: "Assets/Rooms/room3DRL.png",
        upperSrc: "Assets/test.png",
        walls:{
            [utils.asGridCoords(1,2)]: true,
            [utils.asGridCoords(2,2)]: true,
            [utils.asGridCoords(2,1)]: true,
            [utils.asGridCoords(4,4)]: true,
            [utils.asGridCoords(4,5)]: true,
            [utils.asGridCoords(5,4)]: true,
        },
        cutsceneSpaces: {},
        polygon:[
            [1,1],
            [1,6],
            [6,6],
            [6,1]
          ]
    },
    "room3UDL":{
        enemies:{
            enemy1: new Person({
                id: "Vampire",
                src: "Assets/vampire.png",
                onCooldown: [],
                x: utils.withGrid(5),
                y: utils.withGrid(3),
              
                talking: [
                  {
                    events: [
                      {type: "fight", enemyId: "Vampire",mapId: "enemy1"}
                    ]
                  }
                ]
              }),
        },
        lowerSrc: "Assets/Rooms/room3UDL.png",
        upperSrc: "Assets/test.png",
        walls:{
            [utils.asGridCoords(1,2)]: true,
            [utils.asGridCoords(1,4)]: true,
            [utils.asGridCoords(2,1)]: true,
            [utils.asGridCoords(2,2)]: true,
            [utils.asGridCoords(2,4)]: true,
            [utils.asGridCoords(2,5)]: true,
            [utils.asGridCoords(4,1)]: true,
            [utils.asGridCoords(4,5)]: true,
            [utils.asGridCoords(5,1)]: true,
            [utils.asGridCoords(5,5)]: true,
        },
        cutsceneSpaces: {},
        polygon:[
            [1,1],
            [1,6],
            [6,6],
            [6,1]
          ]
    },
    "room3UDR":{
        enemies:{
            enemy1: new Person({
                id: "GoblinR",
                src: "Assets/goblinR.png",
                onCooldown: [],
                x: utils.withGrid(1),
                y: utils.withGrid(5),
              
                talking: [
                  {
                    events: [
                      {type: "fight", enemyId: "GoblinR",mapId: "enemy1"}
                    ]
                  }
                ]
              }),
              enemy2: new Person({
                id: "Skeleton",
                src: "Assets/skeleton.png",
                onCooldown: [],
                x: utils.withGrid(4),
                y: utils.withGrid(2),
              
                talking: [
                  {
                    events: [
                      {type: "fight", enemyId: "Skeleton",mapId: "enemy2"}
                    ]
                  }
                ]
              }),
              
        },
        lowerSrc: "Assets/Rooms/room3UDR.png",
        upperSrc: "Assets/test.png",
        walls:{
            [utils.asGridCoords(1,3)]: true,
            [utils.asGridCoords(2,3)]: true,
            [utils.asGridCoords(2,2)]: true,
            [utils.asGridCoords(2,1)]: true,
            [utils.asGridCoords(4,4)]: true,
            [utils.asGridCoords(4,5)]: true,
            [utils.asGridCoords(5,4)]: true,
        },
        cutsceneSpaces: {},
        polygon:[
            [1,1],
            [1,6],
            [6,6],
            [6,1]
          ]
    },
    "room3URL":{
        enemies:{
            enemy1: new Person({
                id: "DeathMage",
                src: "Assets/deathmage.png",
                onCooldown: [],
                x: utils.withGrid(3),
                y: utils.withGrid(4),
              
                talking: [
                  {
                    events: [
                      {type: "fight", enemyId: "DeathMage",mapId: "enemy1"}
                    ]
                  }
                ]
              }),
        },
        lowerSrc: "Assets/Rooms/room3URL.png",
        upperSrc: "Assets/test.png",
        walls:{
            [utils.asGridCoords(1,2)]: true,
            [utils.asGridCoords(1,4)]: true,
            [utils.asGridCoords(1,5)]: true,
            [utils.asGridCoords(2,1)]: true,
            [utils.asGridCoords(2,2)]: true,
            [utils.asGridCoords(4,1)]: true,
            [utils.asGridCoords(4,2)]: true,
            [utils.asGridCoords(5,2)]: true,
            [utils.asGridCoords(5,4)]: true,
            [utils.asGridCoords(5,5)]: true,
        },
        cutsceneSpaces: {},
        polygon:[
            [1,1],
            [1,6],
            [6,6],
            [6,1]
          ]
    },
    "room4UDRL":{
        enemies:{
            enemy1: new Person({
                id: "DeathMage",
                src: "Assets/deathmage.png",
                onCooldown: [],
                x: utils.withGrid(2),
                y: utils.withGrid(5),
              
                talking: [
                  {
                    events: [
                      {type: "fight", enemyId: "DeathMage",mapId: "enemy1"}
                    ]
                  }
                ]
              }),
        },
        lowerSrc: "Assets/Rooms/room4UDRL.png",
        upperSrc: "Assets/test.png",
        walls:{
            [utils.asGridCoords(1,2)]: true,
            [utils.asGridCoords(1,4)]: true,
            [utils.asGridCoords(2,1)]: true,
            [utils.asGridCoords(2,2)]: true,
            [utils.asGridCoords(2,4)]: true,
            [utils.asGridCoords(4,1)]: true,
            [utils.asGridCoords(4,2)]: true,
            [utils.asGridCoords(4,4)]: true,
            [utils.asGridCoords(4,5)]: true,
            [utils.asGridCoords(5,4)]: true,
            [utils.asGridCoords(5,2)]: true,
        },
        cutsceneSpaces: {},
        polygon:[
            [1,1],
            [1,6],
            [6,6],
            [6,1]
          ]
    },
}

window.activeRooms = Object.assign({}, Rooms);