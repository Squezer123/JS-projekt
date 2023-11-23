let btns = document.getElementsByClassName("formSwitch");
btns[0].addEventListener('click', function(){
    document.getElementById("loginForm").style.display = "flex"
    document.getElementById("registerForm").style.display = "none"
    btns[0].style.borderBottom = "1px solid white";
    btns[0].style.marginBottom = "9px";
    btns[1].style.borderBottom = "none";
})
btns[1].addEventListener('click', function(){
    document.getElementById("loginForm").style.display = "none"
    document.getElementById("registerForm").style.display = "flex"
    btns[1].style.borderBottom = "1px solid white";
    btns[1].style.marginBottom = "9px";
    btns[0].style.borderBottom = "none";
})


document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Zapobiega domyślnemu zachowaniu przycisku submit (czyli przekierowaniu)
    
    // Pobierz dane z formularza
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Wyślij dane do serwera
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        // Otrzymaj i obsłuż odpowiedź od serwera
        console.log(data);

        // Sprawdź, czy logowanie było udane
        if (data.message === 'Zalogowano pomyślnie.') {
            // Jeśli logowanie było udane, uruchom funkcję Overworld
            startOverworld();
        } else {
            // W przeciwnym razie, wyświetl komunikat o błędzie
            console.error('Błąd logowania:', data.message);
            
        }
    })
    .catch(error => console.error('Błąd:', error));
});

function startOverworld() {
    const gameContainer = document.querySelector(".game-container");
    const loginForm = document.querySelector(".login")
    loginForm.style.display = "none";
    gameContainer.style.display = "block";
    const overworld = new Overworld({
        element: document.querySelector(".game-container")
    });
    document.querySelector(".game-container")

    overworld.init();
}
