window.Actions = {
    //Attacks
    normalAttack:
    {
        label: "Normal Attack",
        type: "attack",
        damage: 10,
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
        damage: 5,
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
        damage: 15,
        description: "Slow, easy to dodge, but very harmfull",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION} on {TARGET}!"},
            {type: "animation", animation: "spin"},
            {type: "stateChange", damage: 15}
        ]
    },
    bloodAttack:
    {
        label: "Blood Attack",
        type: "attack",
        damage: 10,
        description: "Slow, easy to dodge, but very harmfull",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION} on {TARGET}!"},
            {type: "animation", animation: "spin"},
            {type: "stateChange", damage: 10},
            {type: "stateChange", heal: 5, onCaster:true}
        ]
    },
    //Spells
    fireBall:
    {
        label: "Fireball",
        type: "spell",
        targetType: "NotFriendly",
        damage: 20,
        dealsDamage: true,
        description: "Narrow and small space? Use Fireball! What can go wrong?",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION} on {TARGET}!"},
            {type: "animation", animation: "glob", color: "darkred"},
            {type: "stateChange", cooldown: 3, label: "Fireball", onCaster: true},
            {type: "stateChange", damage: 20}
        ]
    },
    arcaneBlast:
    {
        label: "ArcaneBlast",
        type: "spell",
        targetType: "NotFriendly",
        damage: 15,
        dealsDamage: true,
        description: "YEEET",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION} on {TARGET}!"},
            {type: "animation", animation: "glob", color: "blue"},
            {type: "stateChange", damage: 15}
        ]
    },
    shockBlast:
    {
        label: "Shockblast",
        type: "spell",
        targetType: "NotFriendly",
        cooldown: 3,
        dealsDamage: false,
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
        targetType: "friendly",
        type: "spell",
        dealsDamage: false,
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION}"},
            {type: "stateChange", status: {type: "Enraged", expiresIn: 3}, onCaster: true}
        ]
    },
    death: {
        label: "Death",
        description: "Imagine being clumsy in a fight",
        damage: 9999,
        targetType: "NotFriendly",
        dealsDamage: true,
        type: "spell",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION} on {TARGET}"},
            {type: "animation", animation: "glob", color: "purple"},
            {type: "stateChange", damage: 9999}
        ]
    },
    clumsyStatus: {
        label: "Clumsyness",
        description: "Imagine being clumsy in a fight",
        targetType: "NotFriendly",
        type: "spell",
        dealsDamage: false,
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION} on {TARGET}"},
            {type: "animation", animation: "glob", color: "yellow"},
            {type: "stateChange", status: {type: "clumsy", expiresIn: 3}}
        ]
    },
    poisonStatus: {
        label: "Poison",
        targetType: "NotFriendly",
        description: "Throw potion with stinking liquid on someone!",
        type: "spell",
        dealsDamage: false,
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