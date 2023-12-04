class Room{
    constructor(config) { 
        this.size = config.size || {x: 5, y: 5};

        this.image = new Image();
        this.image.src = config.src || "";
    }

drawRoom(x,y,ctx){
    ctx.drawImage(this.image, x, y);
}

adjustRoom(exits, isStartingPoint,directions){
    let firstLetters = utils.directionFirstLetters(directions);
    this.src = `Assets/Rooms/room${exits}${firstLetters}.png`;
     
}

init(){
    this.adjustRoom();
}
}