var auth;
function signinparsed(data) {
    console.log(`auth value ${data}`);
    auth = data;
}
function signincallback(resp) {
    resp.json().then(signinparsed);
}
function signin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    
    fetch("http://localhost:3000/signup",{
        method : "POST",
        body : {
            username : username,
            password: password
        }
    }).then(signincallback);
}
function loginparsed(data) {
    console.log(data);
}
function logincallback(resp) {
    resp.json().then(loginparsed);
}
function login() {
    var username = document.getElementById("loginusername").value;
    
    fetch("http://localhost:3000/login", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json",
            "username" : username,
            "Authorization" : auth
        }
    }).then(logincallback)
}