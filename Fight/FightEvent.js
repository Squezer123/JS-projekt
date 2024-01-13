class FightEvent {
    constructor(event, battle){
        this.event = event;
        this.battle = battle;
    }

    textMessage(resolve){
        const text = this.event.text
        .replace("{CASTER}", this.event.caster?.name)
        .replace("{TARGET}", this.event.target?.name)
        .replace("{ACTION}", this.event.action?.label)
        
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
        const {caster, target, damage,damageT,damageG, status, action, selfDamage, cooldown, label} = this.event
        const who = this.event.onCaster ? caster : target;

        const targetDiv = who.team === "player" ? document.querySelector(".Fight_hero") : document.querySelector(".Fight_enemy");
        if(damage){
            targetDiv.classList.add("battle-damage-blink");            
            who.update({
                hp: who.hp - damage * target.damageTakenMod * caster.damageGivenMod
            })
            await utils.wait(600);
        }

        if(selfDamage){
            targetDiv.classList.add("battle-damage-blink");   
            who.update({
                hp: who.hp - selfDamage
            })
            await utils.wait(600);  
        }

        if(damageT){
            who.update({
                damageTakenMod: damageT
            })
        }

        if(damageG){
            who.update({
                damageGivenMod: damageG
            })
        }
        if(cooldown){
            console.log("wykonuje sie cooldown");
            console.log("czyj cd",who)
            let tempArr = who.onCooldown;
            let newCD = {
                label: label,
                turns: cooldown
            }
            tempArr.push(newCD);
            who.update({
                onCooldown: tempArr
            })
        }

        if(status){
            who.update({
                status: {...status}
            })
        }

        if(status === null){
            who.update({
                status: null
            })
        }


        targetDiv.classList.remove("battle-damage-blink");
        resolve();
    }

    submissionMenu(resolve){
        const menu = new SubmissionMenu({
            caster: this.event.caster,
            enemy: this.event.enemy,
            items: this.battle.items,
            onComplete: submission => {
                resolve(submission)
            }
        })
        menu.init(this.battle.element)
    }

    giveXp(resolve){
        let amount = this.event.xp;
        const {combatant} = this.event;
        resolve();
    }

    animation(resovle){
        const fn = BattleAnimations[this.event.animation];
        fn(this.event, resovle);
    }

    init(resolve){
        this[this.event.type](resolve);
    }
}