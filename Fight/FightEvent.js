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
        const {caster, target, damage,damageT,damageG, status, action, selfDamage, cooldown, label, heal} = this.event
        const who = this.event.onCaster ? caster : target;

        const targetDiv = who.team === "player" ? document.querySelector(".Fight_hero") : document.querySelector(".Fight_enemy");
        if(damage){
            targetDiv.classList.add("battle-damage-blink");            
            who.update({
                hp: who.hp - damage * target.damageTakenMod * caster.damageGivenMod
            })
            await utils.wait(600);
        }

        if(heal){
            let maxHp = who.maxHp;
            let healValue = heal;
            if(who.hp + heal > maxHp)
            {
                healValue = maxHp - who.hp;
            }
            who.update({
                hp: who.hp + healValue
            })
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

    giveXp(resolve) {
        let amount = this.event.xp;
        const combatant = this.event.combatant;
        let combatantLevel = combatant.level
        combatantLevel = parseInt(combatantLevel, 10);
        let levelsGained = 0;
        
        combatant.xp += amount;
        console.log("przed while", combatantLevel)
        while (combatant.xp >= 100) {
            combatant.xp -= 100;
            combatantLevel += 1;
            combatant.maxHp += 5;
            combatant.hp = combatant.maxHp;
            levelsGained += 1;
            totalLevels += 1;
            let tempClass = this.event.combatant.class.toLowerCase();
            console.log("Combatant level:", combatantLevel);
            cookies.modifyCookie(`${tempClass}Level`, combatantLevel);
            combatant.level = combatantLevel;
            let popUp = new PopUp(levelsGained);
            popUp.init();
            
            setTimeout(() => {
                popUp.removeElement();
            }, 3000);
        }
        
        totalLevels = 0;
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