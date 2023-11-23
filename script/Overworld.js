class Overworld {
constructor(config) {
 this.element = config.element;
 this.canvas = this.element.querySelector(".game-canvas");
 this.ctx = this.canvas.getContext("2d");
 this.map = null;
}
    startGameLoop() {
        const step = () => {
            let player = this.map.gameObjects.player;
            let mark = this.map.gameObjects.mark;
            let flask = this.map.gameObjects.flask;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.translate(100, 20);
            this.map.drawBackgroundImage(this.ctx);
            Object.values(this.map.gameObjects).forEach(object => {
            
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                });
            })
            let {x,y} = utils.nextPosition(player.x,player.y,player.direction)
            // console.log('Przed:',player.inventory);  
            // console.log('Przed:',flask.inventory);
            
            //     player.moveItem(flask.inventory);
            //     console.log('Po',player.inventory);
            //     console.log('Po',flask.inventory);

            mark.x = x+1*16;
            mark.y = y+2*16;
            mark.sprite.draw(this.ctx);
            Object.values(this.map.gameObjects).sort((a,b) => {
                return a.y - b.y;
            }).forEach(object => {
                object.sprite.draw(this.ctx);
            });
            

            requestAnimationFrame(() => {
                step();
            })
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        }
        step();
    }
 
      
    init(){
        this.map = new OverworldMap(window.OverworldMaps.DemoRoom);
        // this.map.generateObjects(); 
        this.map.mountObjects();
        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.directionInput.direction;
        this.startGameLoop();
    }

}