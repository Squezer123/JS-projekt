window.EnemyTypes = {
    normal: "normal",
    cursed: "cursed",
    enhacned: "enhanced",
}


window.Enemies = {
    "Skeleton": {
        onCooldown: [],
        level: 2,
        name: "Skeleton",
        type: EnemyTypes.normal,
        src: "../Assets/skeleton.png",
        actions: ["normalAttack"],
        damageTakenMod: 1,
        damageGivenMod: 1,
        hp:35,
        team: "enemy",
        maxHp:35,
    },
    "Skull": {
        onCooldown: [],
        name: "Skull",
        type: EnemyTypes.normal,
        src: "../Assets/skull.png",
        actions: ["arcaneBlast"],
        hp:35,
        team: "enemy",
        maxHp:35,
        damageTakenMod: 1,
        damageGivenMod: 1,
        xp: 0,
        level: 3,
        status: null
    },
    "GoblinR": {
        onCooldown: [],
        name: "Goblin",
        type: EnemyTypes.normal,
        src: "../Assets/goblinR.png",
        actions: ["fastAttack","poisonStatus"],
        hp:15,
        team: "enemy",
        maxHp:15,
        damageTakenMod: 1,
        damageGivenMod: 1,
        xp: 0,
        level: 1,
        status: null
    },
    "GoblinL": {
        onCooldown: [],
        name: "Goblin",
        type: EnemyTypes.normal,
        src: "../Assets/goblinL.png",
        actions: ["fastAttack","poisonStatus"],
        hp:15,
        team: "enemy",
        maxHp:15,
        damageTakenMod: 1,
        damageGivenMod: 1,
        xp: 0,
        level: 1,
        status: null
    },
    "Vampire": {
        onCooldown: [],
        name: "Vampire",
        type: EnemyTypes.normal,
        src: "../Assets/vampire.png",
        actions: ["bloodAttack"],
        hp:40,
        team: "enemy",
        maxHp:40,
        damageTakenMod: 1,
        damageGivenMod: 1,
        xp: 0,
        level: 4,
        status: null
    },
    "DeathMage": {
        onCooldown: [],
        name: "Death Mage",
        type: EnemyTypes.normal,
        src: "../Assets/deathMage.png",
        actions: ["death"],
        hp:5,
        team: "enemy",
        maxHp:5,
        damageTakenMod: 1,
        damageGivenMod: 1,
        xp: 0,
        level: 20,
        status: null
    },


}