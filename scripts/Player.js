class Player{
    constructor(nick,selectedClass){
        if(window.heroInstance){
            return window.heroInstance;
        }
        
        window.heroInstance = new Person({
            nick: nick,
            class: selectedClass,
            id: "hero",
            x: utils.withGrid(1),
            y: utils.withGrid(1),
            inventory: [],
            hp:50,
            team: "player",
            maxHp:50,
            xp: 0,
            level: 5,
            damageTakenMod: 1,
            damageGivenMod: 1,
            status: null,
            isPlayerControlled: true,
            actions: ["normalAttack","strongAttack","fastAttack","clumsyStatus","enragedStatus"]
          });
        window.heroInstance.setPlayerControlled(true)
        return window.heroInstance
    }
}