 class Person extends GameObject{
    constructor(config){
        super(config);
        this.movingProgressRemaining = 0;
        this.isPlayerControlled = config.isPlayerControlled || false;
        this.mark = new Image();
        
        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1],
        }
    }
    update(state) {
        if (this.movingProgressRemaining > 0) {
          this.updatePosition();
        } else {
    

          if (!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow) {
            this.startBehavior(state, {
              type: "walk",
              direction: state.arrow
            })
          }
          this.updateSprite(state);
        }
      }
    

    startBehavior(state, behavior){
        this.direction = behavior.direction;
        if(behavior.type === "walk"){
            if(state.map.isPointInPolygon(this.x,this.y,this.direction) === false || state.map.isSpaceTaken(this.x,this.y,this.direction) === true){

                return;
            }
            state.map.moveWall(this.x, this.y, this.direction);
            console.log(state.map.walls);
            this.movingProgressRemaining = 16;
            this.updateSprite(state);
        }

        if(behavior.type === "stand"){
            setTimeout(() => {
                utils.emitEvent("PersonStandingComplete", {whoId: this.id})
            }, behavior.time);
        }
    }
    updatePosition(){
        
            const [property, change] = this.directionUpdate[this.direction];
            this[property] += change;
            this.movingProgressRemaining -= 1;
            if(this.movingProgressRemaining === 0){
                utils.emitEvent("PersonWalkingComplete", {whoId: this.id})
            }
            

    }

    updateSprite(state){
        if(this.movingProgressRemaining === 0){
        this.sprite.setAnimation("idle-"+this.direction);
        return;
        }

        if(this.movingProgressRemaining > 0){
            this.sprite.setAnimation("walk-"+this.direction);  
        }
    }
    drawMark(ctx) {
        const { x, y } = utils.nextPosition(this.x, this.y, this.direction);
        console.log(x);
        console.log(y);
        
        this.mark.src = 'Assets/mark.png';
    
        this.mark.onload = () => {
            console.log('test');
            ctx.drawImage(this.mark,
                0, 0,   
                16, 16, 
                this.x, this.y,   
                16, 16 
            );
        };
    }
    

    showInventory(){
        try{
            console.log(this.inventory);
        }
        catch(e){
            console.log(e);
            return;
        }
        
    }
   
 }

