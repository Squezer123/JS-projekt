class CreateCharacter{
    constructor(){
        this.element;
        this.selectedClass;
        this.resolveChooseClass;
    }
    createElement(type){
        if(type === "class"){
            this.element = document.createElement("div");
            let body = document.body;
            this.element.classList.add("container");
            console.log("createChar",cookies.getCookieData("wizardLevel"));
            this.element.innerHTML = (`
                <div
                    class="box box-1"
                    style="--img: url(../Assets/CharImages/mage.jpg)"
                    data-text="Level: ${cookies.getCookieData("wizardLevel")} Wizard"
                ></div>
                <div
                    class="box box-2"
                    style="--img: url(../Assets/CharImages/rogue.jpg)"
                    data-text="Level: ${cookies.getCookieData("rogueLevel")} Rogue"
                ></div>
                <div
                    class="box box-3"
                    style="--img: url(../Assets/CharImages/warior.jpg)"
                    data-text="Level: ${cookies.getCookieData("warriorLevel")} Warior"
                ></div>
            `);        
            
            this.element.querySelectorAll('.box').forEach(box => {
                const className = box.dataset.text.split(' ')[2];
                console.log("klasa",className);
                box.addEventListener('click', () => this.chooseClass(className));
            });

            body.appendChild(this.element)
        }
    }

    chooseClass(selectedClass) {
        this.selectedClass = selectedClass;
        if (this.resolveChooseClass) {
            this.resolveChooseClass(this.selectedClass);
        }
        this.element.remove();
    }

    async waitForClassSelection() {
        return new Promise(resolve => {
            this.resolveChooseClass = resolve;
        });
    }
    async init(){
        this.createElement("class");
        await this.waitForClassSelection();
    }

    
}