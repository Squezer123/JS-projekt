const utils = {
  withGrid(n) {
    return n * 16;
  },

  asGridCoords(x,y){
    return `${x*16},${y*16}`;
  },
  nextPosition(initialX, initialY, direction) {
    let x = initialX;
    let y = initialY;
    const size = 16;
    if (direction === "left") { 
      x -= size;
    } else if (direction === "right") {
      x += size;
    } else if (direction === "up") {
      y -= size;
    } else if (direction === "down") {
      y += size;
    }
    return {x,y};
  },

  oppositeDirection(direction){
    if(direction === "left") return "right";
    if(direction === "right") return "left";
    if(direction === "up") return "down";
    return "up";
  },

  emitEvent(name, detail){
    const event = new CustomEvent(name,{
      detail
    });
    document.dispatchEvent(event); 
  },

  checkPossibilities(array,x,y){
    let possibleRooms = 0;
    try{
      if(array[x+1][y] === 0){
        possibleRooms+=1;
      }
    }
    catch(e){}
    try{
      if(array[x-1][y] === 0){
        possibleRooms+=1;
      }
    }
    catch(e){

    }
    try{
      if(array[x][y+1] === 0){
        possibleRooms+=1;
      }
    }
    catch(e){

    }
    try{
      if(array[x][y-1] === 0){
        possibleRooms+=1;
      }
    }
    catch(e){

    }
    console.log(possibleRooms);
    return possibleRooms;
  }
}