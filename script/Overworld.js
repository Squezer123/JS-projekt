class Overworld {
constructor(config) {
 this.element = config.element;
 this.canvas = this.element.querySelector(".game-canvas");
 this.ctx = this.canvas.getContext("2d");
}

init(){
    const image = new Image();
    image.onload = () => {
        this.ctx.drawImage(image,0,0);
    }
    image.src = "/Assets/test.png"
    const x = 0;
    const y = 0;
    const hero = new Image();
    hero.onload = () => {
        this.ctx.drawImage(
            hero,
            0,
            0,
            49,
            49,
            x*16,
            y*16,
            49,
            49
            
            );
    }
    hero.src = "/Assets/player.png"
}

}