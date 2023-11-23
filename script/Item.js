class Item  {
    constructor(config) {
      this.id = config.id || 0;
      this.type = config.type || "Nothing";
      this.rarity = config.rarity || "Normal";
      this.name = config.name || "Undefined";
      this.src = config.src || 'Assets/items/flasks/flasks_1_1.png';
    }
  }
  
