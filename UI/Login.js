const loginForm = document.querySelector(".login");
const registerForm = document.querySelector(".register");
const loginButton = document.querySelector(".submitLogin");
const formContainer = document.querySelector(".loginForm");
const gameContainer = document.querySelector(".game-container");

document.querySelector(".loginSwitch").addEventListener("click",()=>{
    if(!registerForm.classList.contains("register"))
    registerForm.classList.add("register");

    loginForm.style.display = "flex";
})

document.querySelector(".registerSwitch").addEventListener("click",()=>{
    registerForm.classList.remove("register");
    loginForm.style.display = "none";
})

loginButton.addEventListener("click", ()=>{
    formContainer.style.display = "none";
    gameContainer.style.display = "none";
    // initGame();
    let newChar = new CreateCharacter();
    newChar.createElement();
})
