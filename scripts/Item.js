class Item{
    constructor(name) {
        this.name = name || "test";
        this.decorator = new ItemDecorator(this)
    }

}