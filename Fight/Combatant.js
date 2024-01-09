class Combatant{
    constructor(config, fight) {
        Object.keys(config).forEach(key => {
            this[key] = config[key];
        })
        this.fight = fight;
    }

    get hpPercent(){
        const percent = this.hp / this.maxHp * 100;
        return percent > 0 ? percent : 0;
    }



    get isActive() {
        return this.fight.activeCombatants[this.team] === this.id
    }

    createElement(){
        this.hudElement = document.createElement("div");
        this.hudElement.classList.add("Combatant");
        this.hudElement.setAttribute("data-combatant", this.id);
        this.hudElement.setAttribute("data-team", this.team);
        this.hudElement.innerHTML = (`
        <p class="Combatant_name">${this.name}</p>
        <svg viewBox="0 0 26 2" class="Combatant_life-container">
                <rect x=0 y=0 width="100%" height=2 fill="green" />
        </svg>
        <p class="Combatant_status"></p>
        `)
        this.hpFills = this.hudElement.querySelectorAll(".Combatant_life-container > rect");
    }

    update(changes={}){
        Object.keys(changes).forEach(key => {
            this[key] = changes[key]
        });

        this.hudElement.setAttribute("data-active", this.isActive);

        this.hpFills.forEach(rect => rect.style.width = `${this.hpPercent}%`)

        const statusElement = this.hudElement.querySelector(".Combatant_status")
        
        if(this.status){
            statusElement.innerText = this.status.type;
            statusElement.style.display = "block";
        }
        else {
            statusElement.innerText = "";
            statusElement.style.display = "none";
        }
    }

    getPostEvents(){
        if(this.status?.type === "Enraged"){
            return [
                { type: "stateChange", damageT: 1.25, onCaster: true},
                { type: "stateChange", damageG: 1.25, onCaster: true}
            ]
        }
        return [];
    }

    decrementStatus(){
        if(this.status?.expiresIn > 0 ){
            this.status.expiresIn -= 1;
            if(this.status.expiresIn === 0){
                this.update({
                    status: null,
                })
                return {
                    type: "textMessage",
                    text: "Status expired!"
                }
            }
        }
        return null;
    }

    init(container){
        this.createElement();
        container.appendChild(this.hudElement);
        this.update()
    }
}