class FightEvent {
    constructor(event, battle){
        this.event = event;
        this.battle = battle;
    }

    textMessage(resolve){

        const text = this.event.text
        .replace("{CASTER}", this.event.caster?.name)
        .replace("{TARGET}", this.event.target?.name)
        .replace("{ACTION}", this.event.action?.name)
        
        const message = new TextMessage({
            text,
            onComplete: () => {
                resolve();
            }
        })
        message.init(this.battle.element);
    }

    async stateChange(resolve){
        console.log(this.event);
        const {caster, target, damage,damageT,damageG} = this.event
        const targetDiv = target.team === "player" ? document.querySelector(".Fight_hero") : document.querySelector(".Fight_enemy");
        if(damage){
            targetDiv.classList.add("battle-damage-blink");            
            target.update({
                hp: target.hp - damage * target.damageTakenMod * caster.damageGivenMod
            })
            await utils.wait(600);
        }

        if(damageT){
            const who = this.event.onCaster ? caster : target;
            who.update({
                damageTakenMod: damageT
            })
        }

        if(damageG){
            const who = this.event.onCaster ? caster : target;
            who.update({
                damageGivenMod: damageG
            })
        }

        

        targetDiv.classList.remove("battle-damage-blink");
        resolve();
    }

    submissionMenu(resolve){
        const menu = new SubmissionMenu({
            caster: this.event.caster,
            enemy: this.event.enemy,
            onComplete: submission => {
                resolve(submission)
            }
        })
        menu.init(this.battle.element)
    }

    animation(resovle){
        const fn = BattleAnimations[this.event.animation];
        fn(this.event, resovle);
    }

    init(resolve){
        this[this.event.type](resolve);
    }
}