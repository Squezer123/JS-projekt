class Overworld {
 constructor(config) {
   this.element = config.element;
   this.canvas = this.element.querySelector(".game-canvas");
   this.ctx = this.canvas.getContext("2d");
   this.map = null;
   this.hero = config.hero;
   this.inventoryOpen = false;
   this.dungeonMap = [];
   this.currenPosition; 
   this.ctx.imageSmoothingEnabled = false;
   this.vision;

 }

  async startGameLoop() {
    const step = () => {
      //Clear off the canvas
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(1.5, 1.5);

      const cameraPerson = this.map.gameObjects.hero;
      Object.values(this.map.gameObjects).forEach(object => {
        object.update({
          arrow: this.directionInput.direction,
          map: this.map,
        })
      })
      // Draw Lower layer
      this.map.drawLowerImage(this.ctx, cameraPerson);



      const gameObjectsIterator = new GameObjectsIterator(this.map.gameObjects);

      let nextObject = gameObjectsIterator.next();
      while (!nextObject.done) {
        const object = nextObject.value;
        object.sprite.draw(this.ctx, cameraPerson, object.isObject);
        nextObject = gameObjectsIterator.next();
      }

      // // Draw Upper layer
      // this.map.drawUpperImage(this.ctx);
      if(!this.map.isPaused || restartOverworld){
        requestAnimationFrame(() => {
          step();   
        })
      }
      
    }
    step();
 }


 bindActionInput(){
  new KeyPressListener("KeyE", () => {
    this.map.checkForActionCutscene();
  })
  new KeyPressListener("Escape", () => {
    if(!this.isCutscenePlaying){
      if(!isMenuOpened){
        isMenuOpened = true;
        this.map.startCutscene([
          { type: "pause" },
        ])
      }
    }
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

  this.hud = new Hud();
  this.hud.init(document.querySelector(".game-container"));

  this.startMap(window.OverworldMaps.Lobby);

  this.bindActionInput();
  this.bindHeroPositionCheck();


  this.directionInput = new DirectionInput();
  this.directionInput.init();

  this.startGameLoop();
  // this.map.startCutscene([
  //   {type: "fight", enemyId: "c001"}
  // ]);
 }
}