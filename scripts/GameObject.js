class GameObject {
  constructor(config) {

    this.id = null;
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.direction = config.direction || "down";
    this.sprite = new Sprite({
      gameObject: this,
      src: config.src || "Assets/playerv2.png",
    });

    this.behaviorLoop = config.behaviorLoop || [];
    this.behaviorLoopIndex = 0;

    this.talking = config.talking || [];
    this.inventory = config.inventory || [];
    this.isObject = config.isObject || false;
  }

  mount(map) {
    console.log("mounting!")
    this.isMounted = true;
    map.addWall(this.x, this.y);

    setTimeout(()=>{
      this.doBehaviorEvent(map);
    }, 10)
  }

  update() {

  }

  async doBehaviorEvent(map){

    if(map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding){
      return;
    }

    let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
    eventConfig.who = this.id;

    const eventHandler = new OverworldEvent({map, event: eventConfig});
    await eventHandler.init();

    this.behaviorLoopIndex += 1;
    if(this.behaviorLoopIndex === this.behaviorLoop.length){
      this.behaviorLoopIndex = 0;
    }

    this.doBehaviorEvent(map);
  }

  showInventory(map){
        console.log(this.inventory);
        const inventory = new Inventory({
            map: map,
            hero: this,
            onComplete: () => resolve() 
         })
         inventory.init(document.querySelector(".game-container"));
  }

  addToInventory(inventory,map){
    this.inventory.push(inventory[0]);
    let inv = document.querySelector(".Inventory");
    if(inv)
    {
      inv.remove();
      this.showInventory(map);
    }
    const item = inventory[0];

    if (typeof item.useEffect !== 'function'){
      const decorator = new ItemDecorator(item);
  
      decorator.addUseEffect();
  
      const decoratedItem = decorator.getItem();
  
      decoratedItem.useItem();
      decoratedItem.useEffect();
    }
  }
  
}