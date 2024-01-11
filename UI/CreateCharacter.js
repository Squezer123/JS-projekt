class CreateCharacter{
    constructor(){

    }
    createElement(){
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
        console.log("wykonało się")
        
        body.appendChild(this.element)
    }

    
}