class Dialog extends TextMessage{
    constructor(config){
        super(config);
        this.options = config.options || ["test",]
    }
    createElement(){
        this.element = document.createElement("div");
        this.element.classList.add("TextMessage");

        this.element.innerHTML = (`
            <p class="TextMessage_p"></p>
            <button class="TextMessage_button">Next</button>
        `)

        this.revealingText = new RevealingText({
            element: this.element.querySelector(".TextMessage_p"),
            text: this.text
        })

        this.element.querySelector("button").addEventListener("click", () => {
            this.done();
        });

        this.actionListener = new KeyPressListener("Enter", ()=> {
            
            this.done();
        })
    }
}