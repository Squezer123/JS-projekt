class GameObject {
    constructor(config) {
        this.id = null;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "down";
        this.isThisMark = config.isThisMark || false;
        this.isThisObject = config.isThisObject || false;
        this.inventory = config.inventory || [];
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "Assets/playerv2.png",
        });
        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;
    }
    
    update() {
        
    }

    // moveItem(itemInventory){
    //     itemInventory.forEach(element => {
    //         this.inventory.push(element);
    //         itemInventory.shift();
    //     });
    // }

    mount(map) {
        this.isMounted = true;
        if(this.isThisMark === true){
            return;
        }
        map.addWall(this.x, this.y);
        setTimeout(() => {
          this.doBehaviorEvent(map);
        }, 10)
      }
    async doBehaviorEvent(map){

        if(map.isCutscenePlaying || this.behaviorLoop.length === 0){
            return;
        }
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;

        const eventHandler = new OverworldEvent({map, event: eventConfig })
        await eventHandler.init();
    
        this.behaviorLoopIndex += 1;
        
        
               
        if(this.behaviorLoopIndex === this.behaviorLoop.length){
            this.behaviorLoopIndex = 0;
        }
        
        await this.doBehaviorEvent(map)
    }
}