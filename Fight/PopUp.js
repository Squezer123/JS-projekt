class PopUp{
    constructor(levelGained){
        this.element;
        this.levelGained = levelGained;
    }

    createElement(){
        this.element = document.createElement("div");
        this.element.classList.add("PopUp");
        this.element.innerHTML = (`Level Up! x${this.levelGained}`);
        document.querySelector(".game-container").appendChild(this.element);
        this.element.classList.add("PopUp-fade-in");
    }

    removeElement(){
            this.element.remove();
            delete this;
    }

    init(){
        this.createElement();
    }
}