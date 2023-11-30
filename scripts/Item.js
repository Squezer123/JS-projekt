class Item{
    constructor(config) {
        this.id = config.id || 0;
        this.name = config.name || "test";
        this.amount = config.amount || 0;
        this.description = config.description || "test";
        this.image = new Image();
        this.image.src = config.src || "Assets/items/flasks/flasks_1_1.png"
    }

    useItem(){

    }
}