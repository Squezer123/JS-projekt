class Overworld {
 constructor(config) {
   this.element = config.element;
   this.canvas = this.element.querySelector(".game-canvas");
   this.ctx = this.canvas.getContext("2d");
   this.map = null;
   this.hero = config.hero;
   this.inventoryOpen = false;
 }

  startGameLoop() {
    const step = () => {
      //Clear off the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      const cameraPerson = this.map.gameObjects.hero;
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        })
      })
      //Draw Lower layer
      this.map.drawLowerImage(this.ctx, cameraPerson);

      //Draw Game Objects
      Object.values(this.map.gameObjects).sort((a,b) => {
        return a.y - b.y;
      }).forEach(object => {
        object.sprite.draw(this.ctx, cameraPerson, object.isObject);
      })

      //Draw Upper layer
      // this.map.drawUpperImage(this.ctx);
      
      requestAnimationFrame(() => {
        step();   
      })
    }
    step();
 }


 showInventory(){
  new KeyPressListener("KeyI", () => {
    if(this.inventoryOpen === false){
      this.map.gameObjects.hero.showInventory(this.map);
      
      this.inventoryOpen === true;
    }
    else{
      this.inventoryOpen === false;
    }
    
  })
 }

 bindActionInput(){
  new KeyPressListener("KeyE", () => {
    this.map.checkForActionCutscene();
  })
 }

 bindHeroPositionCheck(){
  document.addEventListener("PersonWalkingComplete", e=> {
    if(e.detail.whoId === "hero"){
      this.map.checkForFootstepCutscene();
    }
  })
 }

 startMap(mapConfig){
  this.map = new OverworldMap(mapConfig);
  this.map.overworld = this;
  this.map.AddHero(this.hero);
  this.map.mountObjects();
 }

 init() {
  this.startMap(window.OverworldMaps.Lobby);
  let x = new DungeonCreator(this.ctx);
  x.init();
  this.showInventory();
  this.bindActionInput();
  this.bindHeroPositionCheck();


  this.directionInput = new DirectionInput();
  this.directionInput.init();

  this.startGameLoop();
  // this.map.startCutscene();
 }
}