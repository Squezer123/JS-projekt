const loginForm = document.querySelector(".login");
const registerForm = document.querySelector(".register");
const loginButton = document.querySelector(".submitLogin");
const registerButton = document.getElementById('registerForm')
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

loginButton.addEventListener("click", async (event) => {
    event.preventDefault();
    // Pobierz dane z formularza
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Wyślij zdarzenie 'login' z danymi do serwera
    socket.emit('login', { username, password });

    // Nasłuchuj zdarzenia 'loginResponse' od serwera
    socket.on('loginResponse', (data) => {
        if (data.success) {
            formContainer.style.display = "none";
            gameContainer.style.display = "none";
            let newChar = new CreateCharacter();
            newChar.init().then(() => {
                let selectedClass = newChar.selectedClass;
                initGame(selectedClass);
            });
        } else {

          console.log(data.message)
        }
    });
});

registerButton.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const confirm_password = document.getElementById('confirm_password').value;
    console.log(password);
    console.log(confirm_password);

    if (password !== confirm_password) {
        alert('Hasła nie pasują do siebie.');
        return;
    }

    socket.emit('register', { username, password });

    socket.on('registerResponse', (data) => {
        if (data.success) {
            alert(data.message); 
            if(!registerForm.classList.contains("register"))
                registerForm.classList.add("register");
                loginForm.style.display = "flex";
        } else {
            alert(data.message); 
        }
    });
});

