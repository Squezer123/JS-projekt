window.EnemyTypes = {
    normal: "normal",
    cursed: "cursed",
    enhacned: "enhanced",
}


window.Enemies = {
    "n001": {
        name: "Wkurwiony Roman",
        type: EnemyTypes.normal,
        src: "../Assets/skeleton2_v2_1.png",
        actions: ["damage1"]
    },
    "c001": {
        onCooldown: [],
        name: "XYZ",
        type: EnemyTypes.normal,
        src: "../Assets/skeleton2_v2_1.png",
        actions: ["death","strongAttack","damage1"],
        hp:10,
        team: "enemy",
        maxHp:50,
        damageTakenMod: 1,
        damageGivenMod: 1,
        xp: 0,
        level: 1,
        status: null
    },
    "e001": {
        name: "XYZ",
        type: EnemyTypes.normal,
        src: "../Assets/skeleton2_v2_1.png",
        actions: ["damage1"]
    }

}