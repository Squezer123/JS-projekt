class SubmissionMenu {
    constructor({caster, enemy, onComplete, items}){
        this.caster = caster;
        this.enemy = enemy;
        this.onComplete = onComplete;

        let quantityMap = {};
        items.forEach(item => {
            if(item.team === caster.team){

                let existing = quantityMap[item.actionId]
                if(existing){
                    existing.quantity += 1;
                }else {
                    quantityMap[item.actionId] = {
                        actionId: item.actionId,
                        quantity: 1,
                        instanceId: item.instanceId
                    }
                }
            }
        });
        this.items = Object.values(quantityMap);
    }

    getPages(){

        const backOption = {
            label: "Go Back",
            description: "Return to previous menu",
            disabled: false,
            handler: () =>{
                this.keyboardMenu.setOptions(this.getPages().root)
            }
        }
        return{
            root: [
                {
                    label: "Attack",
                    description: "Choose an attack",
                    handler: () => {
                        this.keyboardMenu.setOptions(this.getPages().attacks)
                    }
                },
                {
                    label: "Spells",
                    description: "Choose an spell to use",
                    handler: () => {
                        this.keyboardMenu.setOptions(this.getPages().spells)
                    }
                },
                {
                    label: "Item",
                    description: "Choose an item",
                    handler: () => {
                        this.keyboardMenu.setOptions(this.getPages().items)
                    }
                }
            ],
            attacks: [
                ...this.caster.actions.map(key =>{
                    const action = Actions[key];
                    if(action.type === "attack")
                    return{
                        label: action.label,
                        description: action.description,
                        disabled: false,
                        handler: () => {
                            this.menuSubmit(action);
                        },
                    }
                }),
                backOption
            ].filter(Boolean),
            items: [
                ...this.items.map(item =>{
                    const action = Actions[item.actionId];
                    return{
                        label: action.label,
                        description: action.description,
                        right: () => {
                            return "x"+item.quantity;
                        },
                        handler: () => {
                            this.menuSubmit(action, item.instanceId);
                        },
                    }
                }),
                backOption
            ].filter(Boolean),
            spells: [
                ...this.caster.actions.map(key =>{
                    const action = Actions[key];
                    let isOnCd = false;
                    let turnsRem = 0;
                    if(action.type === "spell"){
                        console.log("cooldown:",this.caster,this.caster.onCooldown);
                        console.log(this.caster.onCooldown.length)
                        if(this.caster.onCooldown.length > 0){
                            this.caster.onCooldown.forEach(el => {
                                if(el.label === action.label){
                                    isOnCd = true;
                                    turnsRem = el.turns;
                                }
                                
                            })
                        }
                        return{
                            label: action.label,
                            description: action.description,
                            disabled: isOnCd,
                            right: () => {
                                if(turnsRem === 0){
                                    return "";
                                }else{
                                    return turnsRem;
                                }
                            },
                            handler: () => {
                                this.menuSubmit(action);
                            },
                        }
                    }
                }),
                backOption
            ].filter(Boolean),
        }
    }

    menuSubmit(action, instanceId){
        this.keyboardMenu?.end();
        this.onComplete({
            action,
            target: action.targetType === "friendly" ? this.caster : this.enemy,
            instanceId
        })  
    }

    decide(){
        let AI = new CombatantAI(this.caster,this.enemy);
        let action = AI.decide();
        console.log("id:", action, "Jaka akcja:", this.caster.actions[action]);
        this.menuSubmit(Actions[this.caster.actions[action]])
    }

    showMenu(container){
        this.keyboardMenu = new KeyboardMenu();
        this.keyboardMenu.init(container);
        this.keyboardMenu.setOptions(this.getPages().root);
    }

    init(container){
        if(this.caster.isPlayerControlled){
            this.showMenu(container);
        } else {
            this.decide();
        }
    }
}