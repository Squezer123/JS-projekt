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
            this.element.classList.add("container")
            this.element.innerHTML = (`
                <div
                    class="box box-1"
                    style="--img: url(../Assets/CharImages/mage.jpg)"
                    data-text="Mage"
                ></div>
                <div
                    class="box box-2"
                    style="--img: url(../Assets/CharImages/rogue.jpg)"
                    data-text="Rogue"
                ></div>
                <div
                    class="box box-3"
                    style="--img: url(../Assets/CharImages/warior.jpg)"
                    data-text="Warior"
                ></div>
            `);        
            
            this.element.querySelectorAll('.box').forEach(box => {
                box.addEventListener('click', () => this.chooseClass(box.dataset.text));
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