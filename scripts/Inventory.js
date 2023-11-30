class Inventory {
    constructor({hero, map}) {
        this.hero = hero
        this.activeElement = 0;
        this.element = null;
        this.firstClick = true;
        this.map = map;
    }

    createElement() {
        if(document.querySelector(".Inventory")){
            return;
        }
        else{
            this.element = document.createElement("div");
            this.element.classList.add("Inventory");

        }

        this.hero.inventory.forEach((item, index) => {
           let src = item.image.src
           let invItem = document.createElement("img")
           invItem.classList.add("invImg");
           invItem.id = `${index}`;
           invItem.src = `${src}`;
           invItem.addEventListener("click", () => {
            if(this.firstClick){
                this.firstClick = false;
                this.activeElement = invItem.id;
                invItem.style.border = "1px solid red";
            }
            else{
                document.getElementById(`${this.activeElement}`).style.border = "none";
                invItem.style.border = "1px solid red";

                this.activeElement = invItem.id;
            }

            let options = document.createElement("div");
            options.classList.add("Options");
            options.innerHTML = "Drop"
            options.style.left = `${invItem.offsetLeft}px`;
            options.style.top = `${invItem.offsetTop}px`;
            this.element.appendChild(options);
            options.addEventListener("click", async() => {
                const removedItem = this.hero.inventory.splice(invItem.id, 1)[0];
                const name = removedItem.name;
                this.element.removeChild(invItem);
                this.element.removeChild(options);
                
                await this.waitForPlayer();

                this.map.gameObjects[name] = new GameObject({
                    id: `${name}`,
                    x: this.hero.x,
                    y: this.hero.y,
                    src: `${removedItem.image.src}`,
                    isObject: true,
                    inventory: [
                      removedItem,
                     ], 
                    talking: [
                      {
                        events: [
                          {type: "PickItem", faceHero: `${name}`}
                        ]
                      }
                    ]
                  })
                  this.map.mountObjects();
            });
           })
           this.element.appendChild(invItem);
           
        });
    
        this.actionListener = new KeyPressListener("Escape", () => {
            this.done();
        });
    }
    
    waitForPlayer() {
        return new Promise((resolve) => {
            const checkPlayerMovement = () => {
                if (this.map.gameObjects.hero.movingProgressRemaining === 0) {
                    resolve();
                } else {
                    requestAnimationFrame(checkPlayerMovement);
                }
            };
    
            checkPlayerMovement();
        });
    }

    done(){
        this.element.remove();  
        
    }

    init(container){
        this.createElement();
        if(this.element)
        container.appendChild(this.element);
    }
}