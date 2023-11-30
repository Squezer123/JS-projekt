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

    @ChangeMapDecorator 
    changeMap(resolve) {
        const sceneTransition = new SceneTransition();
        sceneTransition.init(document.querySelector(".game-container"), () => {
            this.map.removeWall(this.map.gameObjects.hero.x, this.map.gameObjects.hero.y);
            this.map.overworld.startMap(window.OverworldMaps[this.event.map]);
            console.log(this.event.map)
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
function ChangeMapDecorator(target, key, descriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = function (resolve) {
        if (this.event.map === "Dungeon") {
            console.log("Entering dungeon behavior");
        } else {
            console.log("Exiting dungeon behavior");
           
        }
        originalMethod.call(this, resolve);
    };

    return descriptor;
}