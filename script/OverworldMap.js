class OverworldMap {
    constructor(config) {
        this.gameObjects = config.gameObjects;

        this.backgroundImage = new Image();
        this.backgroundImage.src = config.backgroundSrc;
    }

    drawBackgroundImage(ctx){
        ctx.drawImage(this.backgroundImage, 0, 0);
    }
}

window.OverworldMaps = {
    DemoRoom:{
        backgroundSrc: "/Assets/test.png",
        gameObjects: {
            player: new Person({
                isPlayerControlled: true,
                x: utils.withGrid(1),
                y: utils.withGrid(1),
            }),
            // npc: new Person({
            //     isPlayerControlled: false,
            //     x: utils.withGrid(5),
            //     y: utils.withGrid(5),
            // })
        }
    },
}
