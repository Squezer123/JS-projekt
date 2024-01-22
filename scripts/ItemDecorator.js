class ItemDecorator {
    constructor(item) {
      this.item = item;
      this.setItem();
      return item;
    }
    setItem(){
      if(this.item.name === "healingPotion"){
        this.item.actionId = "item_healingPotion";
        this.item.team = "player";
      }
      
    }
  }