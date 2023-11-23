document.getElementById("registerForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Pobierz dane z formularza rejestracji
    const username = document.getElementById("usernamereg").value;
    const password = document.getElementById("passwordreg").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    console.log('haslo: ',password)
    // Sprawdź, czy hasła się zgadzają
    if (password !== confirmPassword) {
        console.log('haslo: ',password)
        console.log('Potwierdzone: ',confirmPassword)
        console.error('Błąd rejestracji: Hasła nie są zgodne.');
        return;
    }

    // Wyślij dane do serwera
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);

        // Sprawdź, czy rejestracja była udana
        if (data.message === 'Rejestracja pomyślna.') {
            // Jeśli rejestracja była udana, możesz uruchomić funkcję logowania lub inne działania
            console.log('Rejestracja udana. Możesz teraz się zalogować.');
            location.reload();
        } else {
            console.error('Błąd rejestracji:', data.message);
        }
    })
    .catch(error => console.error('Błąd:', error));
});
