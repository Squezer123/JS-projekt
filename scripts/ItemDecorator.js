class ItemDecorator {
    constructor(item) {
      this.item = item;
    }
  
    addUseEffect() {
    let losowaLiczba = Math.random();
    if(losowaLiczba < 0.2){
        this.item.useEffect = function () {
            console.log(`${this.name} is cursed!`);
          };
    }
    else{
        this.item.useEffect = function () {
            console.log(`${this.name} is fine!`);
          };
    }
      
    }

    getItem() {
      return this.item;
    }
  }