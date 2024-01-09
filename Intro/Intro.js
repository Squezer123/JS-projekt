const tempBack = document.querySelector(".tempBack");
const logo = document.querySelector(".logo");


let intro = async () =>{
    await utils.wait(1500);
    logo.classList.add("intro")
    await utils.wait(1700);
    tempBack.classList.add("fadeOut");
}

intro();
