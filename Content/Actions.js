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
    enragedStatus: {
        label: "Enrage",
        type: "spell",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION}"},
            {type: "stateChange", status: {type: "Enraged", expiresIn: 3}, onCaster: true}
        ]
    },
    clumsyStatus: {
        label: "Clumsyness",
        type: "spell",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION} on {TARGET}"},
            {type: "animation", animation: "glob", color: "yellow"},
            {type: "stateChange", status: {type: "clumsy", expiresIn: 3}}
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