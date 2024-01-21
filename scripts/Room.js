class Room{
    constructor(config) { 
        this.size = config.size || {x: 5, y: 5};
        this.roomData;

        this.image = new Image();
        this.image.src = config.src || "";
    }

adjustRoom(exits,directions){
    let firstLetters = utils.directionFirstLetters(directions);
    let tempData = Rooms[`room${exits}${firstLetters}`]
    this.roomData = tempData;
    console.log(this.roomData)
    this.src = `Assets/Rooms/room${exits}${firstLetters}.png`;
     
}

init(){
    this.adjustRoom();
}
}