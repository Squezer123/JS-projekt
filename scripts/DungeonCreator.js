class DungeonCreator{
    constructor() {
        this.rows = 5;
        this.columns = 5;
        this.dungeonMap = this.createEmptyMap();
        this.startingPoint = this.createStartingPoing();
    }

    createEmptyMap() {
        return new Array(this.rows).fill(0).map(() => new Array(this.columns).fill(0));
    }
    
    generateRandomCords(){
        let x = Math.floor(Math.random() * 3) + 1;
        let y = Math.floor(Math.random() * 3) + 1; 
        return { x, y };
    }

    createStartingPoing() {
        let startingPoint = this.generateRandomCords();
        let x = startingPoint.x;
        let y = startingPoint.y
        this.dungeonMap[x][y] = 1; // starting point
        return {x,y}
    }

    generateDisplay() {
        let RoomAmount = Math.floor(Math.random() * (6 - 3 + 1)) + 3;
        let half = Math.round(RoomAmount / 2);
        let x = this.startingPoint.x;
        let y = this.startingPoint.y
        let visited = [this.startingPoint];


        while(RoomAmount > 0){
                let currentRoom = {x: x,y: y};
                let possible = utils.checkPossibilities(this.dungeonMap,x,y,0)
                let nextRooms = Math.floor(Math.random() * possible) + 2;
                let newRooms = [];
                if(!visited.includes(currentRoom)){
                for(let i = 3; i >= 0; i--){
                    let params = [{x:x-1,y: y}, {x:x+1,y: y}, {x:x,y: y+1},{x:x,y: y-1}];
                    let randomSide = Math.floor(Math.random() * 4);;
                    let tempX = params[randomSide].x;
                    let tempY = params[randomSide].y;
                    
                    try{
                        if(nextRooms > 0 && this.dungeonMap[tempX][tempY] === 0)
                        {
                            this.dungeonMap[tempX][tempY] = 2;
                            nextRooms -= 1;
                            RoomAmount -=1;
                            newRooms.push({x: tempX,y:tempY});
                        }
                    }
                    catch(e){}
                }
                visited.push(currentRoom);
                }
                
                let nextRoomIndex = Math.floor(Math.random() * newRooms.length);
                let nextRoom = newRooms[nextRoomIndex];
                if(nextRoom === undefined)
                return;
                if(!visited.includes(nextRoom)){
                    x = nextRoom.x;
                    y = nextRoom.y;
                    visited.push(nextRoom);
                }
                else
                return;
                
            
        }
    }
    createRoom(x,y){
        let exits = utils.checkPossibilities(this.dungeonMap, x,y,2) + utils.checkPossibilities(this.dungeonMap, x,y,1);
        let directions = utils.checkDirections(this.dungeonMap,x,y)
        let isStartingPoint = false;
        if(x === this.startingPoint.x && y === this.startingPoint.y)
            isStartingPoint = true;
        let room = new Room({
            src: "",
        });
        room.adjustRoom(exits, isStartingPoint, directions);
        return room;
    }

    createDungeon() {
        let dungeonArray = [];
      
        this.dungeonMap.forEach((row, rowIndex) => {
          let newRow = []; 
      
          row.forEach((element, columnIndex) => {
            if (this.dungeonMap[rowIndex][columnIndex] === 1 || this.dungeonMap[rowIndex][columnIndex] === 2) {
              newRow.push({
                Room: this.createRoom(rowIndex, columnIndex),
                directions: utils.checkDirections(this.dungeonMap,rowIndex,columnIndex),
            });
              console.log(`Room: ${rowIndex},${columnIndex}`, this.createRoom(rowIndex, columnIndex));
            } else {
              
              newRow.push(this.dungeonMap[rowIndex][columnIndex]);
            }
          });
      
          dungeonArray.push(newRow);
        });
        return dungeonArray;
      }
      

    init() {
        this.generateDisplay();
        this.dungeonMap = this.createDungeon();
        console.log(this.dungeonMap);
        
       
    }
}

