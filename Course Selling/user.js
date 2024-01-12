
//////////////////   USER CREATION
function usersignupparsed(data) {
    console.log(data);
}
function usersignupcallback(resp) {
    resp.json().then(usersignupparsed);
}
function usersignup() {
    var username = document.getElementById("userusername").value;
    var password = document.getElementById("userpassword").value;
    fetch("http://localhost:8000/users/signup", {
        method : "POST",
        body : JSON.stringify({
            username : username,
            password : password
        }),
        headers : {
            "Content-Type": "application/json",
        }
    }).then(usersignupcallback);
}
/////////////////////// USER LOGIN
function logincallbackparsed(data) {
    console.log(data);
}
function logincallback(resp) {
    resp.json().then(logincallbackparsed);
}
function userlogin() {
    var username = document.getElementById("loginusername").value;
    var password = document.getElementById("loginpassword").value;
    fetch("http://localhost:8000/users/login" , {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
            "username" : username,
            "password" : password
        }
    }).then(logincallback);
}
///////////////////////////// USER COURSE PURCHASE
function coursepurchaseparsed(data) {
    console.log(data);
}
function coursepurchasecallback(resp) {
    resp.json().then(coursepurchaseparsed);
}
function coursepurchase() {
    var title = document.getElementById("coursetitle").value;
    var username = document.getElementById("loginusername").value;
    var password = document.getElementById("loginpassword").value;
    console.log(title)
    fetch("http://localhost:8000/users/" + title, {
            method : "POST",
            headers : {
                "Content-Type": "application/json",
                "username" : username,
                "password" : password
            }
    }).then(coursepurchasecallback);
}
////////////////////////////////// GET ALL COURSES
function getcoursesparsed(data) {
    console.log(data);
    var parentelement = document.getElementById("user courses");
    parentelement.innerHTML = "";
    var tempdata = data;
    for(var i=0;i<tempdata.length;i++)
    {
        var childEllement = document.createElement("div");

        var grandchild1 = document.createElement("span");
        grandchild1.innerHTML = tempdata[i].username;
        console.log(tempdata[i].username)
        grandchild1.classList.add("username");

        var grandchild2 = document.createElement("span");
        grandchild2.innerHTML = tempdata[i].coursetitle;
            grandchild2.classList.add("coursetitle")
        var grandchild3 = document.createElement("span");
        grandchild3.innerHTML = tempdata[i].coursedescription
        grandchild2.classList.add("coursedescription")

        childEllement.append(grandchild1);
        childEllement.append(grandchild2);
        childEllement.append(grandchild3);

        parentelement.appendChild(childEllement)
    }
}
function getcoursescallback(resp) {
    resp.json().then(getcoursesparsed);
}
function showcourses() {
    var username = document.getElementById("loginusername").value;
    var password = document.getElementById("loginpassword").value;
    fetch("http://localhost:8000/users/courses", {
        method : "GET",
        headers : {
            "Content-Type": "application/json",
            "username" : username,
            "password" : password
        }
    }).then(getcoursescallback);
}