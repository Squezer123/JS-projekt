class Fight {
    constructor() {
        this.combatants = {
            "player1": new Combatant({
                name: 'Gracz',
                hp:50,
                team: "player",
                maxHp:50,
                xp: 0,
                level: 5,
                damageTakenMod: 1,
                damageGivenMod: 1,
                status: {
                    type: "Enraged",
                    expiresIn: 3
                },
                actions: ["damage1"]
            },this),
            "enemy1": new Combatant({
                ...Enemies.c001,
                hp:50,
                team: "enemy",
                maxHp:50,
                damageTakenMod: 1,
                damageGivenMod: 1,
                xp: 0,
                level: 1,
                status: null
            },
            this),
            // "enemy2": new Combatant({
            //     ...Enemies.c001,
            //     hp:30,
            //     team: "enemy",
            //     maxHp:50,
            //     xp: 0,
            //     level: 1,
            //     status: null
            // },
            // this)
        };
        this.activeCombatants = {
            player: "player1",
            enemy: "enemy1",
        }
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Fight");
        this.element.innerHTML= (`

        <div class="Fight_hero">
            <img src="${'./Assets/playerv2.png'}" alt="Hero" />
        </div>
        <div class ="Fight_enemy">
            <img src="${'/Assets/playerv2.png'}" alt="Enemy" />
        </div>
        `)
    }

    init(container) {
        this.createElement();
        container.appendChild(this.element);

        Object.keys(this.combatants).forEach(key=>{
            let combatant = this.combatants[key];
            combatant.id = key;
            combatant.init(this.element);
        })

        this.turnCycle = new TurnCycle({
            battle: this,
            onNewEvent: event => {
                return new Promise(resolve => {
                    const fightEvent = new FightEvent(event, this)
                    fightEvent.init(resolve);
                })
            }
        })

        this.turnCycle.init();

    }
}