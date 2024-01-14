class Player{
    constructor(nick,selectedClass,restart){
        this.restart = restart
        this.classStats;
        this.selectedClass = selectedClass;
        this.level = 0;
        this.setStats();

        if(window.heroInstance && this.restart === false){
            return window.heroInstance;
        }
    
        window.heroInstance = new Person({
            ...this.classStats,
            name: nick,
            id: "hero",
            x: utils.withGrid(7),
            y: utils.withGrid(7),
            inventory: [],
            team: "player",
            xp: 0,
            level: this.level,
            damageTakenMod: 1,
            damageGivenMod: 1,
            status: null,
            isPlayerControlled: true,
          });

        window.heroInstance.agility;
        window.heroInstance.setPlayerControlled(true)
        return window.heroInstance
    }

    setStats(){
        if(this.selectedClass === "Rogue"){
            this.classStats = classes['Rogue'];
            this.level = cookies.getCookieData("rogueLevel");
        }
        if(this.selectedClass === "Wizard"){
            this.classStats = classes['Wizard'];
            this.level = cookies.getCookieData("wizardLevel");
        }
        if(this.selectedClass === "Warior"){
            this.classStats = classes['Warior'];
            this.level = cookies.getCookieData("wariorLevel");
        }
    }
}