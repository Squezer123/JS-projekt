class TurnCycle {
    constructor({battle, onNewEvent}){
        this.battle = battle;
        this.onNewEvent = onNewEvent;
        this.currentTeam = "enemy";
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

        const resoultingEvents = submission.action.success;
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

        this.currentTeam = this.currentTeam === "player" ? "enemy" : "player";
        this.turn();
    }

    async init(){
        console.log("wykonuje się")
        await this.onNewEvent({
            type: "textMessage",
            text: "Let the battle begin"
        })

        this.turn();
    }
}