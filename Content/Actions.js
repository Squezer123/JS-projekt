window.Actions = {
    damage1: {
        name: "Strike",
        success: [
            {type: "textMessage", text: "{CASTER} used {ACTION} on {TARGET}!"},
            {type: "animation", animation: "spin"},
            {type: "stateChange", damage: 10}
        ]
    }
}