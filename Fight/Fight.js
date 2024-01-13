class Fight {
    constructor({enemy, onComplete,mapId,map}) {
        this.enemy = enemy;
        this.onComplete = onComplete;
        this.mapId = mapId;
        this.map = map;
        this.combatants = {
            // "player1": new Combatant({
            //     name: 'Gracz',
            //     ...heroInstance
            // },this),
            // "enemy1": new Combatant({
            //     ...Enemies.c001,
            // },
            // this),
            
        };
        this.addCombatants();
        this.activeCombatants = {
            enemy: "enemy",
            player: "player",
        }

        this.items = [
            { actionId: "item_recoverStatus", instanceId: "p1", team: "player" },
            { actionId: "item_recoverStatus", instanceId: "p2", team: "player" },
            { actionId: "item_recoverStatus", instanceId: "p3", team: "enemy" }
        ]
    }
    
    addCombatants(){
        this.combatants['player'] = new Combatant({
            ...heroInstance
        },this)
        this.combatants['enemy'] = new Combatant({
            ...this.enemy
        },this)
        console.log(this.combatants);
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
            },
            onWinner: winner => {
                
                if(winner === "player"){
                    const playerCombatant = this.combatants["player"]
                    heroInstance.hp = playerCombatant.hp;
                    heroInstance.xp = playerCombatant.xp;
                    
                    const tempEnemy = OverworldMaps.Lobby.gameObjects[this.mapId];
                    this.map.removeWall(tempEnemy.x, tempEnemy.y)
                    delete this.map.gameObjects[this.mapId]
                }
                if(winner === "enemy"){
                    const playerCombatant = this.combatants["player"]
                    heroInstance.hp = playerCombatant.hp;
                    heroInstance.xp = playerCombatant.xp;
                }
                this.element.remove();
                this.onComplete();
            }
        })

        this.turnCycle.init();

    }
}