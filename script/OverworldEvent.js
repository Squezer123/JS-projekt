class OverworldEvent {
    constructor({map, event}){
        this.map = map;
        this.event = event;
    }

    stand(resolve){
        const who = this.map.gameObjects[this.event.who];

    
        who.startBehavior({
            map: this.map
        }, {
            type: "stand",
            direction: this.event.direction,
            time: this.event.time,
        });
    
        const completeHandler = e => {
                document.removeEventListener("PersonStandingComplete", completeHandler);
                resolve();   
        }
    
        document.addEventListener("PersonStandingComplete", completeHandler);
    }
    walk(resolve) {

        const who = this.map.gameObjects[this.event.who];

    
        who.startBehavior({
            map: this.map
        }, {
            type: "walk",
            direction: this.event.direction,
        });
    
        const completeHandler = e => {
                document.removeEventListener("PersonWalkingComplete", completeHandler);
                resolve();   
        }
    
        document.addEventListener("PersonWalkingComplete", completeHandler);
    }
    

    init(){
        return new Promise(resolve => {
            this[this.event.type](resolve)
        })
    }
}