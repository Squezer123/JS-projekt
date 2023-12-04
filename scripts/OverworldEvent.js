class OverworldEvent{
    constructor({map,event}){
        this.map = map;
        this.event = event;
    }

    stand(resolve){
        const who = this.map.gameObjects[this.event.who]
        who.startBehavior({
            map: this.map
        },{
            type: "stand",
            direction: this.event.direction,
            time: this.event.time,
        })

        const completeHandler = e => {
            if (e.detail.whoId === this.event.who){
                document.removeEventListener("PersonStandingComplete", completeHandler);
                resolve();
            }
        }

        document.addEventListener("PersonStandingComplete", completeHandler)
    }
    
    walk(resolve){
        const who = this.map.gameObjects[this.event.who]
        who.startBehavior({
            map: this.map
        },{
            type: "walk",
            direction: this.event.direction,
            retry: true
        })

        const completeHandler = e => {
            if (e.detail.whoId === this.event.who){
                document.removeEventListener("PersonWalkingComplete", completeHandler);
                resolve();
            }
        }

        document.addEventListener("PersonWalkingComplete", completeHandler)

    }

    textMessage(resolve){
        if(this.event.faceHero){
            const obj = this.map.gameObjects[this.event.faceHero];
            obj.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction);
        }

        const message = new TextMessage({
           text: this.event.text,
           onComplete: () => resolve() 
        })
        message.init(document.querySelector(".game-container"));
    }

    Dialog(resolve){
        if(this.event.faceHero){
            const obj = this.map.gameObjects[this.event.faceHero];
            obj.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction);
        }
        
        const message = new TextMessage({
           text: this.event.text,
           onComplete: () => resolve() 
        })
        message.init(document.querySelector(".game-container"));
    }

    PickItem(resolve){
        const obj = this.map.gameObjects[this.event.faceHero];
        if(this.event.faceHero){
            
            obj.direction = utils.oppositeDirection(this.map.gameObjects["hero"].direction);
        }
        
        console.log(obj);
        this.map.gameObjects.hero.addToInventory(obj.inventory,this.map);
        this.map.removeWall(obj.x,obj.y);
        delete this.map.gameObjects[this.event.faceHero];
        resolve();
    }

    changeMap(resolve) {
        if(this.event.map === "Lobby"){
            if(this.map.gameObjects.hero.inventory.length === 0){
                console.log("test");
                    const message = new TextMessage({
                        text: "U need a key to leave this place...",
                        onComplete: () => resolve() 
                     })
                     message.init(document.querySelector(".game-container"));
            }
            this.map.gameObjects.hero.inventory.forEach(element => {
                if(element.name === "key"){
                    const sceneTransition = new SceneTransition();
                    sceneTransition.init(document.querySelector(".game-container"), () => {
                        this.map.removeWall(this.map.gameObjects.hero.x, this.map.gameObjects.hero.y);
                        this.map.overworld.startMap(window.OverworldMaps[this.event.map]);
                        console.log(this.event.map)
                        resolve();
                        sceneTransition.fadeOut();
                    });
                }else{
                    console.log("test");
                    const message = new TextMessage({
                        text: "U need a key to leave this place...",
                        onComplete: () => resolve() 
                     })
                     message.init(document.querySelector(".game-container"));
                }

            });
        }
        
        else{
            const sceneTransition = new SceneTransition();
                    sceneTransition.init(document.querySelector(".game-container"), () => {
                        this.map.removeWall(this.map.gameObjects.hero.x, this.map.gameObjects.hero.y);
                        this.map.overworld.startMap(window.OverworldMaps[this.event.map]);
                        console.log(this.event.map)
                        resolve();
                        sceneTransition.fadeOut();
                    });
        }
        
    }
    changeRoom(resolve) {
        let x = this.map.overworld.currenPosition.x;
        let y = this.map.overworld.currenPosition.y;
        console.log(x,y)
        let dungeon = this.map.overworld.dungeonMap;
        let Room = {
            lowerSrc: "Assets/Rooms/room4UDRL.png",
            upperSrc: "Assets/test.png",
            gameObjects: {},
            walls:{},
            cutsceneSpaces: {},
            polygon:[
              [0,0],
              [0,5],
              [5,5],
              [5,0]
            ]
        }
        switch(this.event.direction){
            case "up":
                y -= 1;
                break;  
            case "down":
                y += 1;  
                break; 
            case "right":
                x += 1;  
                break; 
            case "left":
                x -= 1;  
                break; 
            
        }
        Room.cutsceneSpaces = this.generateDoors(dungeon[x][y].directions);
        const sceneTransition = new SceneTransition();
        sceneTransition.init(document.querySelector(".game-container"), () => {
                this.map.removeWall(this.map.gameObjects.hero.x, this.map.gameObjects.hero.y);
                Room.lowerSrc = `${dungeon[x][y].Room.src}`;
                this.map.overworld.currenPosition = {x: x, y:y};
                this.map.overworld.startMap(Room);
                resolve();
                sceneTransition.fadeOut();
            });  
    }

    enterDungeon(resolve){
        let newDungeon = new DungeonCreator(this.ctx);
        newDungeon.init();
        this.map.overworld.dungeonMap = newDungeon.dungeonMap;
        let Room = {
            lowerSrc: "Assets/Rooms/room4UDRL.png",
            upperSrc: "Assets/test.png",
            gameObjects: {},
            walls:{},
            cutsceneSpaces: {},
            polygon:[
              [0,0],
              [0,5],
              [5,5],
              [5,0]
            ]
        }
        Room.cutsceneSpaces = this.generateDoors(newDungeon.dungeonMap[newDungeon.startingPoint.x][newDungeon.startingPoint.y].directions);
        const sceneTransition = new SceneTransition();
                    sceneTransition.init(document.querySelector(".game-container"), () => {
                        this.map.removeWall(this.map.gameObjects.hero.x, this.map.gameObjects.hero.y);
                        Room.lowerSrc = `${newDungeon.dungeonMap[newDungeon.startingPoint.x][newDungeon.startingPoint.y].Room.src}`;
                        this.map.overworld.startMap(Room);
                        this.map.overworld.currenPosition = {
                            x: newDungeon.startingPoint.x,
                            y: newDungeon.startingPoint.y
                        }

                        console.log(this.map);
                        resolve();
                        sceneTransition.fadeOut();
                    });
    }
    generateDoors(directions) {
        let newSpaces = {}; 
      
        directions.forEach(direction => {
          if (direction === 'up') {
            const doorCoords = utils.asGridCoords(2, 0);
            newSpaces[doorCoords] = [];
            newSpaces[doorCoords].push({
              events: [
                { type: "changeRoom", direction: "up" },
              ]
            });
          }
          if (direction === 'down') {
            const doorCoords = utils.asGridCoords(2, 4);
            newSpaces[doorCoords] = [];
            newSpaces[doorCoords].push({
              events: [
                { type: "changeRoom", direction: "down" },
              ]
            });
          }
          if (direction === 'left') {
            const doorCoords = utils.asGridCoords(0, 2);
            newSpaces[doorCoords] = [];
            newSpaces[doorCoords].push({
              events: [
                { type: "changeRoom", direction: "left" },
              ]
            });
          }
          if (direction === 'right') {
            const doorCoords = utils.asGridCoords(4, 2);
            newSpaces[doorCoords] = [];
            newSpaces[doorCoords].push({
              events: [
                { type: "changeRoom", direction: "right" },
              ]
            });
          }
        });
      
        return newSpaces; 
      }

    


    init(){
        return new Promise(resolve => {
            this[this.event.type](resolve);
        })
    }

}
