const cookies = {
    addCookie(name, value, expirationInMinutes) {
        let d = new Date();
        d.setTime(d.getTime() + (expirationInMinutes * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    },
    checkCookie(nazwa) {
        let name = nazwa + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ciasteczka = decodedCookie.split(';');
        
        for(let i = 0; i < ciasteczka.length; i++) {
            let c = ciasteczka[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return true; 
            }
        }
        
        return false; 
    },
    clearCookies() {
        let ciasteczka = document.cookie.split(";");
    
        for (let i = 0; i < ciasteczka.length; i++) {
            let eqPos = ciasteczka[i].indexOf("=");
            let nazwa = eqPos > -1 ? ciasteczka[i].substr(0, eqPos) : ciasteczka[i];
            document.cookie = nazwa + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
        }  
    },
    getCookieData(nazwa) {
        let name = nazwa + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ciasteczka = decodedCookie.split(';');
    
        for (let i = 0; i < ciasteczka.length; i++) {
            let c = ciasteczka[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
    
        return "";
    },
    modifyCookie(cookieName, newValue) {
        document.cookie = `${cookieName}=${newValue}; path=/`;
    }
}