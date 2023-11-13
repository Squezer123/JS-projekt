class GameObject {
    constructor(config) {
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.direction = config.direction || "right";
        this.isThisObject = config.isThisObject || false;
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src || "Assets/playerv2.png",
        });
    }
    update() {

    }
}