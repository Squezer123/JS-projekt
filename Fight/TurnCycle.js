class TurnCycle {
    constructor({battle, onNewEvent, onWinner}){
        this.battle = battle;
        this.onNewEvent = onNewEvent;
        this.onWinner = onWinner;
        this.currentTeam = Math.random() < 0.5 ? "player" : "enemy";
    }

    async turn(){
        
        const casterId = this.battle.activeCombatants[this.currentTeam]
        const caster = this.battle.combatants[casterId]

        const enemyId = this.battle.activeCombatants[caster.team === "player" ? "enemy" : "player"]
        const enemy = this.battle.combatants[enemyId];


        const submission = await this.onNewEvent({
            type: "submissionMenu",
            caster,
            enemy
        })

        if(submission.instanceId){
            this.battle.items = this.battle.items.filter(i => i.instanceId !== submission.instanceId);
        }

        const resoultingEvents = caster.getReplacedEvents(submission.action.success);
        
        for(let i=0; i<resoultingEvents.length; i++){
            const event = {
                ...resoultingEvents[i],
                submission,
                action: submission.action,
                caster,
                target: submission.target,
            }
            await this.onNewEvent(event);
        }


        const postEvenets = caster.getPostEvents();
        for(let i=0; i<postEvenets.length; i++){
            const event = {
                ...postEvenets[i],
                submission,
                action: submission.action,
                caster,
                target: submission.target
            }
            await this.onNewEvent(event);
        }

        const expiredEvent = caster.decrementStatus();
        if(expiredEvent){
            await this.onNewEvent(expiredEvent);
        }

        const winner = this.getWinningTeam();
        const winnerId = this.battle.activeCombatants[winner]
        let loserId;

        if (winnerId === 'player') {
            loserId = 'enemy';
        } else if (winnerId === 'enemy') {
            loserId = 'player';
        } 
        const loser = this.battle.combatants[loserId];

        if (winner){
            await this.onNewEvent({
                type: "textMessage", text:`${loser.name} has fallen`
            })
            
            const xp = submission.target.givesXp;
            if(winnerId === 'player'){
                await this.onNewEvent({
                    type: "textMessage", text: `You got ${xp}xp!`
                })
                if(submission.target.team === "enemy"){
                    await this.onNewEvent({
                        type: "giveXp",
                        xp,
                        combatant: this.battle.combatants[winnerId]
                    })
                }
            }
        }
        
        if (winner) {
        await this.onNewEvent({
            type: "textMessage",
            text: "Winner!"
        })
        this.onWinner(winner);
        return;
        }

        this.nextTurn();
    }

    nextTurn(){
        this.currentTeam = this.currentTeam === "player" ? "enemy" : "player";
        this.turn();
    }

    getWinningTeam() {
        let aliveTeams = {};
        Object.values(this.battle.combatants).forEach(c => {
          if (c.hp > 0) {
            aliveTeams[c.team] = true;
          }
        })
        if (!aliveTeams["player"]) { return "enemy"}
        if (!aliveTeams["enemy"]) { return "player"}
        return null;
      }

    async init(){
        // console.log("wykonuje się")
        // await this.onNewEvent({
        //     type: "textMessage",
        //     text: "Let the battle begin"
        // })

        this.turn();
    }
}