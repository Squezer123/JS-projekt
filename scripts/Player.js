class Player{
    constructor(nick,selectedClass,restart){
        this.restart = restart
        this.classStats;
        this.selectedClass = selectedClass;
        this.setStats();

        if(window.heroInstance && this.restart === false){
            return window.heroInstance;
        }
    
        window.heroInstance = new Person({
            ...this.classStats,
            name: nick,
            id: "hero",
            x: utils.withGrid(1),
            y: utils.withGrid(1),
            inventory: [],
            team: "player",
            xp: 0,
            level: 1,
            damageTakenMod: 1,
            damageGivenMod: 1,
            status: null,
            isPlayerControlled: true,
          });

        
        window.heroInstance.setPlayerControlled(true)
        return window.heroInstance
    }

    setStats(){
        if(this.selectedClass === "Rogue"){
            this.classStats = classes['Rogue'];
        }
        if(this.selectedClass === "Wizard"){
            this.classStats = classes['Wizard'];
        }
        if(this.selectedClass === "Warior"){
            this.classStats = classes['Warior'];
        }
    }
}