class Player{
    constructor(){
        if(window.heroInstance){
            return window.heroInstance;
        }
        window.heroInstance = new Person({
            id: "hero",
            x: utils.withGrid(1),
            y: utils.withGrid(1),
            inventory: [],
          });
        window.heroInstance.setPlayerControlled(true)
        return window.heroInstance
    }
}