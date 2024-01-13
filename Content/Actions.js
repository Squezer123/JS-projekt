window.Actions = {
    //Attacks
    normalAttack:
    {
        label: "Normal Attack",
        type: "attack",
        description: "You just strike with whatever you have in hand",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION} on {TARGET}!"},
            {type: "animation", animation: "spin"},
            {type: "stateChange", damage: 10}
        ]
    },
    fastAttack:
    {
        label: "Fast Attack",
        type: "attack",
        description: "Fast, hard to dodge, but doesn't do much",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION} on {TARGET}!"},
            {type: "animation", animation: "spin"},
            {type: "stateChange", damage: 5}
        ]
    },
    strongAttack:
    {
        label: "Strong Attack",
        type: "attack",
        description: "Slow, easy to dodge, but very harmfull",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION} on {TARGET}!"},
            {type: "animation", animation: "spin"},
            {type: "stateChange", damage: 15}
        ]
    },
    //Spells
    fireBall:
    {
        label: "Fireball",
        type: "spell",
        description: "Narrow and small space? Use Fireball! What can go wrong?",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION} on {TARGET}!"},
            {type: "animation", animation: "glob", color: "darkred"},
            {type: "stateChange", cooldown: 3, label: "Fireball", onCaster: true},
            {type: "stateChange", damage: 20}
        ]
    },
    shockBlast:
    {
        label: "Shockblast",
        type: "spell",
        cooldown: 3,
        description: "Throwing rock at anyone is always an idea",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION} on {TARGET}!"},
            {type: "animation", animation: "glob", color: "grey"},
            {type: "stateChange", cooldown: 3, label: "Shockblast", onCaster: true},
            {type: "stateChange", status: {type: "stunned", expiresIn: 2}}
        ]
    },
    enragedStatus: {
        label: "Enrage",
        description: "Get angry!",
        type: "spell",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION}"},
            {type: "stateChange", status: {type: "Enraged", expiresIn: 3}, onCaster: true}
        ]
    },
    death: {
        label: "Death",
        description: "Imagine being clumsy in a fight",
        type: "spell",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION} on {TARGET}"},
            {type: "animation", animation: "glob", color: "yellow"},
            {type: "stateChange", damage: 2000}
        ]
    },
    clumsyStatus: {
        label: "Clumsyness",
        description: "Imagine being clumsy in a fight",
        type: "spell",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION} on {TARGET}"},
            {type: "animation", animation: "glob", color: "yellow"},
            {type: "stateChange", status: {type: "clumsy", expiresIn: 3}}
        ]
    },
    poisonStatus: {
        label: "Poison",
        description: "Throw potion with stinking liquid on someone!",
        type: "spell",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION} on {TARGET}"},
            {type: "animation", animation: "glob", color: "green"},
            {type: "stateChange", status: {type: "poisoned", expiresIn: 3}}
        ]
    },
    //Items
    item_recoverStatus: {
        label: "Potion",
        description: "Drinking potion is always a solution right?",
        targetType: "Friendly",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION}"},
            {type: "stateChange", status: null, onCaster: true},
            {type: "textMessage", text: "Problem solved"},
        ]
    }
}