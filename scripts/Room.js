class Room{
    constructor(config) {
        this.id = config.id;
        this.name = config.name;
        
        this.sizeX = config.sizeX;
        this.sizeY = config.sizeY;

        this.image = new Image();
        this.image.src = config.src;
    }

drawRoom(x,y,ctx){
    ctx.drawImage(this.image, x, y);
}
}