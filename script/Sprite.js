class Sprite {
    constructor(config){

        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        //Konfiguracja
        this.animations = config.animations || {
            "idle-down":[ [0,0], [1,0], [2,0], [3,0], [4,0], [0,0] ],
            "idle-right":[ [0,1], [1,1], [2,1], [3,1], [4,1], [0,1] ],
            "idle-up":[ [0,2], [1,2], [2,2], [3,2], [4,2], [0,2] ],
            "idle-left":[ [0,10], [1,10], [2,10], [3,10], [4,10], [0,10] ],
            "walk-down":[ [0,3], [1,3], [2,3], [3,3], [4,3], [0,3] ],
            "walk-right":[ [0,4], [1,4], [2,4], [3,4], [4,4], [0,4] ],
            "walk-up":[ [0,5], [1,5], [2,5], [3,5], [4,5], [0,5] ],
            "walk-left":[ [0,11], [1,11], [2,11], [3,11], [4,11], [0,11] ],
        }
        this.currentAnimation = config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;

        this.animationFrameLimit = config.animationFrameLimit || 8;
        this.animationFrameProgress = this.animationFrameLimit;


        this.gameObject = config.gameObject;
    }

    get frame(){
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }

    setAnimation(key){
        if(this.currentAnimation !== key){
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }

    updateAnimationProgress(){
        if (this.animationFrameProgress > 0){
            this.animationFrameProgress -= 1;
            return;
        }
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;

        if(this.frame === undefined){
            this.currentAnimationFrame = 0;
        }
    }


    draw(ctx){
        const x = this.gameObject.x;
        const y = this.gameObject.y;
        const [frameX,frameY] = this.frame;
        this.isLoaded && ctx.drawImage(this.image,
            frameX*48,frameY*48,
            48,48,
            x,y,
            48, 48
        )
        this.updateAnimationProgress();
    }
    
}