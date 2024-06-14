// let auth;
// function postparsed(data) {
//     console.log(data);
//     auth = data;
// }
// function postadmincallback(resp) {
//     resp.json().then(postparsed);
// }
// function postadmin() {
//     var username = document.getElementById("adminusername").value;
//     var password = document.getElementById("adminpassword").value;
//     fetch("http://localhost:3000/admin/signup", {
//         method : "POST",
//         body : JSON.stringify({
//             username : username,
//             password : password
//         }),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     }).then(postadmincallback);
// }
let auth;
function goToNewPage() {
    var newPageUrl = 'maincourse.html';
    window.location.href = newPageUrl;
  }
  
function postparsed(data) {
    console.log(data);
    auth = data;
    goToNewPage();
}

function postadmincallback(resp) {
    // console.log("in postadmincallback")
    // console.log(resp);
    resp.text().then(postparsed);
}

function postadmin() {
    var username = document.getElementById("adminusername").value;
    var password = document.getElementById("adminpassword").value;
    console.log(username + password);
    fetch("http://localhost:3000/admin/signup", {
        method: "POST",
        body: JSON.stringify({
            username: username,
            password: password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(postadmincallback)
}


function login() {
    var username = document.getElementById("loginusername").value;
    var password = document.getElementById("loginpassword").value;
    function loginparsed(data) {
        console.log(data);
        goToNewPage();
    }
    function logincallback(resp) {
        resp.json().then(loginparsed);
    }
    fetch("http://localhost:3000/admin/login",{
        method : "POST",
        body : JSON.stringify({
            username : username,
            password : password
        }),
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : auth
        }
    }).then(logincallback);
}