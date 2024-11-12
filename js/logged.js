const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
console.log(urlParams.has('logged'));
if(sessionStorage.getItem("logged") === null) {
    
    if(urlParams.has('logged')) {
        sessionStorage.setItem("logged", "true");
        if(urlParams.has('isa')) {
            alert("Hello Admin!");
            sessionStorage.setItem("admin", "true");
        }
    } else {
        window.location.href = "index.php";
    }
}

function logout() {
    sessionStorage.removeItem("logged");
    window.location.href = "index.php";
}

function admin() {
    if(sessionStorage.getItem("admin") === "true") {
        console.log("Admin!");
    } else {
        alert("You are not an admin!");
        logout();
    }
}

function logged() {
    if(sessionStorage.getItem("logged")) {
        window.location.href="home.html";
    }
}