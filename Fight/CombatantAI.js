class CombatantAI{
    constructor(caster,target) {
        this.caster = caster;
        this.target = target;
    }

    decide(){
        let isOnCd = false;
        let targetHp = this.target.hp;
        let returnIndex = null;
        let biggestDamage = {
            damage: 0,
            index: 0,
        };
        this.caster.actions.forEach((element,index) => {
            if(Actions[element].type === "attack"){
                if(Actions[element].damage >= targetHp){
                    returnIndex = index;
                    return;
                }
                if(Actions[element].damage > biggestDamage.damage){
                    biggestDamage.damage = Actions[element].damage;
                    biggestDamage.index = index;
                }

            }
            if(Actions[element].type === "spell"){
                for(let i = 0; i <= this.caster.onCooldown.length; i++){
                    console.log("cooldown:", this.caster.onCooldown[i]);
                    if(this.caster.onCooldown[i] !== undefined && this.caster.onCooldown[i] !== null){
                        if(this.caster.onCooldown[i].label === Actions[element])
                        isOnCd = true;
                        else
                        isOnCd = false;
                    }
                }
                if(Actions[element].damage >= targetHp){
                    returnIndex = index;
                    return;
                }
                if(Actions[element].dealsDamage)
                {
                    if(Actions[element].damage > biggestDamage.damage){
                        biggestDamage.damage = Actions[element].damage;
                        biggestDamage.index = index;
                    }
                }
                if(this.target.status === null){
                    if(!isOnCd){
                        if(Actions[element].type === "spell")
                    {
                        if(Actions[element].dealsDamage === false)
                        returnIndex = index;
                        return;
                    }
                    }
                }
            }   
            
        });
        if(returnIndex !== null){
            return returnIndex;
        }
        return biggestDamage.index;
    }
}