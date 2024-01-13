class PauseMenu {
    constructor({onComplete}){
        this.onComplete = onComplete
    }

    getOptions(pageKey){

        if(pageKey === "root"){
            return[
                {
                    label: "Inventory",
                    description: "Let's see what do you have in pockets",
                    handler: () => {

                    }
                },
                {
                    label: "Leave dungeon",
                    description: "Well you can do that but your achivments will be forgotten",
                    handler: () => {

                    }
                },
                {
                    label: "Logout",
                    description: "If you really have to...",
                    handler: () => {
                        this.close();
                    }
                },
                {
                    label: "Close",
                    description: "Close the menu",
                    handler: () => {
                        this.close();
                    }
                }
            ]
        }

        return [];
    }

    createElement(){
        this.element = document.createElement("div");
        this.element.classList.add("PauseMenu");
        this.element.innerHTML = (`
            <h2>Pause Menu </p>
        `)
    }

    close(){
        this.esc?.unbind();
        this.keyboardMenu.end();
        this.element.remove();
        isMenuOpened = false;
        this.onComplete();
    }

    async init(container){
        this.createElement();
        this.keyboardMenu = new KeyboardMenu({

        })
        this.keyboardMenu.init(this.element);
        this.keyboardMenu.setOptions(this.getOptions("root"));

        container.appendChild(this.element);

        await utils.wait(200);
        this.esc = new KeyPressListener("Escape", () => {
                this.close();
        })
    }

}