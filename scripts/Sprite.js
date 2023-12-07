class Sprite {
  constructor(config) {

    //Set up the image
    this.image = new Image();
    this.image.src = config.src;
    this.image.onload = () => {
      this.isLoaded = true;
    }



    //Configure Animation & Initial State
    this.animations = config.animations || {
      "idle-down":[ [0,0], [1,0], [2,0], [3,0], [4,0],  ],
      "idle-right":[ [0,1], [1,1], [2,1], [3,1], [4,1] ],
      "idle-up":[ [0,2], [1,2], [2,2], [3,2], [4,2]],
      "idle-left":[ [0,10], [1,10], [2,10], [3,10], [4,10] ],
      "walk-down":[ [0,3], [1,3], [2,3], [3,3], [4,3] ],
      "walk-right":[ [0,4], [1,4], [2,4], [3,4], [4,4] ],
      "walk-up":[ [0,5], [1,5], [2,5], [3,5], [4,5] ],
      "walk-left":[ [0,11], [1,11], [2,11], [3,11], [4,11]],
  }
    this.currentAnimation = "idle-right"; // config.currentAnimation || "idle-down";
    this.currentAnimationFrame = 0;

    this.animationFrameLimit = config.animationFrameLimit || 8;
    this.animationFrameProgress = this.animationFrameLimit;
    

    //Reference the game object
    this.gameObject = config.gameObject;
  }

  get frame() {
    return this.animations[this.currentAnimation][this.currentAnimationFrame]
  }

  setAnimation(key) {
    if (this.currentAnimation !== key) {
      this.currentAnimation = key;
      this.currentAnimationFrame = 0;
      this.animationFrameProgress = this.animationFrameLimit;
    }
  }

  updateAnimationProgress() {
    //Downtick frame progress
    if (this.animationFrameProgress > 0) {
      this.animationFrameProgress -= 1;
      return;
    }

    //Reset the counter
    this.animationFrameProgress = this.animationFrameLimit;
    this.currentAnimationFrame += 1;

    if (this.frame === undefined) {
      this.currentAnimationFrame = 0
    }


  }
  

  draw(ctx, cameraPerson, isObject) {
    const x = this.gameObject.x - 8 + utils.withGrid(6.5) - cameraPerson.x;
    const y = this.gameObject.y - 18 + utils.withGrid(4) - cameraPerson.y;


    const [frameX, frameY] = this.frame;

    if(!isObject)
    {
      this.isLoaded && ctx.drawImage(this.image,
        frameX * 48, frameY * 48,
        48,48,
        x,y,
        32,32
      )
  
      this.updateAnimationProgress();

    }
    else{
      ctx.drawImage(this.image,x+utils.withGrid(0.5),y+utils.withGrid(1))
    }
    
  }

}