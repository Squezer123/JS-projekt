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

  checkPossibilities(array,x,y,checker){
    let possibleRooms = 0;
    try{
      if(array[x+1][y] === checker){
        possibleRooms+=1;
      }
    }
    catch(e){}
    try{
      if(array[x-1][y] === checker){
        possibleRooms+=1;
      }
    }
    catch(e){

    }
    try{
      if(array[x][y+1] === checker){
        possibleRooms+=1;
      }
    }
    catch(e){

    }
    try{
      if(array[x][y-1] === checker){
        possibleRooms+=1;
      }
    }
    catch(e){

    }
    return possibleRooms;
  },

  directionFirstLetters(directions) {
    return directions.map(word => word.charAt(0).toUpperCase()).join('');;
  },
  
  checkDirections(array,x,y){
    let params = [{x:x-1,y: y, d: "left"}, {x:x+1,y: y, d: "right"}, {x:x,y: y+1, d: "down"},{x:x,y: y-1, d: "up"}];
    let directions = [];
    for(let i = 3; i >= 0; i--){
        let tempX = params[i].x;
        let tempY = params[i].y;
        try{
            if(array[tempX][tempY] === 1 || array[tempX][tempY] === 2)
            {
                directions.push(params[i].d);
            }
        }
        catch(e){}
    }
    return directions;
  }

  
}