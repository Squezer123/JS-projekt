class Hud{
    constructor(){

    }

    update(){

    }
    
    createElement(container){
        this.element = document.createElement("div");
        this.element.classList.add("Hud");

        console.log(heroInstance);

        const name = heroInstance.name;
        const maxHp = heroInstance.maxHp;
        const hp = heroInstance.hp;
        
        const scoreboard = new Combatant({
            name,
            maxHp,
            hp,

        },null)

        scoreboard.createElement();
        this.element.appendChild(scoreboard.hudElement)
        console.log(name, maxHp, hp)
    } 

    init(container){
        this.createElement(container);
        container.appendChild(this.element);
    }
}