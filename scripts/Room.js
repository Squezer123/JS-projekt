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
    // if(isStartingPoint){
    //     this.src = `Assets/Rooms/startingRoom${exits}${firstLetters}`;
    // }
    // else{
    //     this.src = `Assets/Rooms/Room${exits}${firstLetters}`;
    // }
    this.src = `Assets/Rooms/room3UDR.png`;
    
}

init(){
    this.adjustRoom();
}
}