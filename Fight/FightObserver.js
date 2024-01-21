class FightObserver{
    constructor(battle){
        this.battle = battle;
    }

    getWinningTeam(){
        let aliveTeams = {};
        Object.values(this.battle.combatants).forEach(c => {
          if (c.hp > 0) {
            aliveTeams[c.team] = true;
          }
        })
        if (!aliveTeams["player"]) { return "enemy"}
        if (!aliveTeams["enemy"]) { return "player"}
        return null;
    }
}