window.BattleAnimations = {
    async spin(event, onComplete){
        const casterDiv = event.caster.team === "player" ? document.querySelector(".Fight_hero") : document.querySelector(".Fight_enemy");
        const animationClassName = event.caster.team === "player" ? "battle-spin-right" : "battle-spin-left";
        casterDiv.classList.add(animationClassName);

        casterDiv.addEventListener("animationend", ()=> {
            casterDiv.classList.remove(animationClassName);
        }, {once:true})

        await utils.wait(100);
        onComplete();
    }
}