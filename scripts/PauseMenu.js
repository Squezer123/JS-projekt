class PauseMenu {
    constructor({onComplete}){
        this.onComplete = onComplete
    }

    getOptions(pageKey){

        if(pageKey === "root"){
            return[
                {
                    label: "Logout",
                    description: "If you really have to...",
                    handler: () => {
                        this.close();
                        location.reload();
                        cookies.clearCookies();
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