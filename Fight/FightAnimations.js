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
    },

    async glob(event,onComplete){
        const {caster} = event;
        let div = document.createElement("div");
        div.classList.add("glob-orb");
        div.classList.add(caster.team === "player" ? "battle-glob-right" : "battle-glob-left");

        div.innerHTML = (`
        <svg viewBox="0 0 32 32" width="32" height="32">
            <circle cx="16" cy="16" r="16" fill="${event.color}" />
        </svg>
        `);

        div.addEventListener("animationend", ()=> {
           div.remove();
        });

        document.querySelector(".Fight").appendChild(div);

        await utils.wait(820);
        onComplete();
    }
}