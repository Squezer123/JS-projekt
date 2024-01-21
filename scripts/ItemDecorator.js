class ItemDecorator {
    constructor(item) {
      this.item = item;
      this.setItem();
    }
    setItem(){
      if(this.item.name === "healingPotion"){
        this.item.actionId = "heal";
        this.item.team = "player";
      }
      
    }

  }