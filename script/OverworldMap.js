class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;
        this.gameItems = config.gameItems;
        this.walls = config.walls || {};

        this.backgroundImage = new Image();
        this.backgroundImage.src = config.backgroundSrc;
    }

    drawBackgroundImage(ctx){
        ctx.drawImage(this.backgroundImage, 0, 0);
    }


    isSpaceTaken(currX, currY, direction){
        const {x,y} = utils.nextPosition(currX,currY,direction);
        return this.walls[`${x},${y}`] || false;
    }
    addWall(x,y){
        this.walls[`${x},${y}`] = true;
    }
    addGameObject(objX, objY, src) {
        let x = utils.withGrid(objX);
        let y = utils.withGrid(objY);
        const newGameObject = new GameObject({
            x: x+18,
            y: y+25,
            src: src,
            isThisObject: true,
        });

        this.gameObjects['newObject'+x] = newGameObject;
        this.addWall(x, y);
        console.log(this.gameObjects);

        return newGameObject;
    }
    generateObjects(){
        let src ='Assets/items/flasks/flasks_1_1.png'
        for(let i = 0; i < 3; i++){
            let x = Math.floor(Math.random() * 5) + 1;
            let y = Math.floor(Math.random() * 5) + 1;
            this.addGameObject(x,y,src)
        }
    }

    
}


window.OverworldMaps = {
    DemoRoom:{
        backgroundSrc: "/Assets/test.png",
        gameObjects: {
            player: new Person({
                isThisObject: false,
                isPlayerControlled: true,
                x: utils.withGrid(2),
                y: utils.withGrid(2),
            }),
        },
        
        walls:{
            [utils.asGridCoords(7,6)] : true,
            [utils.asGridCoords(8,6)] : true,
            [utils.asGridCoords(9,6)] : true,
            [utils.asGridCoords(10,6)] : true,

        },
        gameItems:{
            npc: new GameObject({
                src: 'Assets/items/flasks/flasks_1_1.png',
                x: utils.withGrid(5),
                y: utils.withGrid(5),
            })
        }
}}
