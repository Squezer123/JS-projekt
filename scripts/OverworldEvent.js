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
        console.log(window.OverworldMaps[this.event.map]);
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
        
    }

    enterDungeon(resolve){
        let newDungeon = new DungeonCreator(this.ctx);
        newDungeon.init();

        
        const sceneTransition = new SceneTransition();
                    sceneTransition.init(document.querySelector(".game-container"), () => {
                        this.map.removeWall(this.map.gameObjects.hero.x, this.map.gameObjects.hero.y);
                        console.log(`../${newDungeon.dungeonMap[newDungeon.startingPoint.x][newDungeon.startingPoint.y].src})`);
                        console.log(window.OverworldMaps[this.event.map]);
                        this.map.overworld.startMap(window.OverworldMaps[this.event.map]);
                        resolve();
                        sceneTransition.fadeOut();
                    });
    }


    init(){
        return new Promise(resolve => {
            this[this.event.type](resolve);
        })
    }

}
