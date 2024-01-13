class Hud{
    constructor(){
        this.scoreboard;
    }

    update(){
        console.log("skad biore hp",heroInstance);
        const hp = heroInstance.hp;
        this.scoreboard.update({
            hp: hp,
        })
    }
    
    createElement(){
        this.element = document.createElement("div");
        this.element.classList.add("Hud");

        console.log(heroInstance);

        const name = heroInstance.name;
        const maxHp = heroInstance.maxHp;
        const hp = heroInstance.hp;
        
        this.scoreboard = new Combatant({
            name,
            maxHp,
            hp,

        },null)

        this.scoreboard.createElement();
        this.element.appendChild(this.scoreboard.hudElement)
    } 

    init(container){
        this.createElement();
        container.appendChild(this.element);
    }
}