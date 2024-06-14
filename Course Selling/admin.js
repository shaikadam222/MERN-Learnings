// getallcourses();
///////////////////////////////////// ADMIN SIGN UP
function postparsed(data) {
    console.log(data);

}
function postadmincallback(resp) {
    console.log(resp);
    resp.json().then(postparsed);
}
function postadmin() {
    var username = document.getElementById("adminusername").value;
    var password = document.getElementById("adminpassword").value;
    fetch("http://localhost:8000/admin/signup", {
        method : "POST",
        body : JSON.stringify({
            username : username,
            password : password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(postadmincallback);
}
///////////////////////////////////// ADMIN LOGIN
function adminfinalcallback(data)
{
   console.log("wowooohohhohoooooo"); 
}
function adminlogincallback(resp) {
    resp.json().then(adminfinalcallback);
}
function adminlogin() {
    var username = document.getElementById("loginusername").value;
    var password = document.getElementById("loginpassword").value; 
    fetch("http://localhost:8000/admin/login", {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
            "username" : username,
            "password" : password
        }
    }).then(adminlogincallback);
}
/////////////////////////////////// COURSE CREATION
function parsedcourse(data) {
    console.log(" COURSE CREATED WOOOHOOOOOOO ");
}
function coursecreatecallback(resp) {
    resp.json().then(parsedcourse);
}
function coursecreate() {

    var username = document.getElementById("loginusername").value;
    var password = document.getElementById("loginpassword").value; 
    var title = document.getElementById("coursetitle").value;
    var description = document.getElementById("coursedescription").value;
    var price = document.getElementById("courseprice").value;
    console.log(title);
    fetch("http://localhost:8000/admin/courses", {
        method : "POST",
        body : JSON.stringify({
            title : title,
            description : description,
            price : price
        }),
        headers : {
            "Content-Type": "application/json",
            "username" : username,
            "password" : password
        }
    }).then(coursecreatecallback);
}
///////////////////////////////////////// COURSE UPDATION
function updatedparsed(data) {
    console.log("course updated WOOOOHOOOOO");
}
function courseupdatecallback(resp) {
    if (resp.ok) {
        resp.json().then(updatedparsed);
    } else {
        console.error("Failed to update course. HTTP status:", resp.status);
        // Handle the error appropriately
    }
}
function updatedcourse() {
    var temptit = document.getElementById("needupdate").value;
    var username = document.getElementById("loginusername").value;
    var password = document.getElementById("loginpassword").value; 
    var title = document.getElementById("updatedcoursetitle").value;
    var description = document.getElementById("updatedcoursedescription").value;
    var price = document.getElementById("updatedcourseprice").value;

    fetch("http://localhost:8000/admin/courses/" + temptit, {
        method : "PUT",
        body : JSON.stringify({
            title : title,
            description : description,
            price : price
        }),
        headers : {
            "Content-Type": "application/json",
            "username" : username,
            "password" : password
        }
    }).then(courseupdatecallback);
}
//////////////////////// GET ALL THE COURTSES
function getallcoursesparsed(data) {
    console.log("printed whole data");
    console.log(data);
    var parentelement = document.getElementById("mainarea");
    parentelement.innerHTML = "";
    for(var i=0;i<data.length;i++)
    {
        var childEllement = document.createElement("div");

        var grandchild1 = document.createElement("span");
        grandchild1.innerHTML = data[i].title;
        grandchild1.classList.add("title");

        var grandchild2 = document.createElement("span");
        grandchild2.innerHTML = data[i].description;
            grandchild2.classList.add("description")
        var grandchild3 = document.createElement("span");
        grandchild3.innerHTML = data[i].price
        grandchild2.classList.add("price")

        childEllement.append(grandchild1);
        childEllement.append(grandchild2);
        childEllement.append(grandchild3);

        parentelement.appendChild(childEllement)
    }
}
function getcoursescallback(resp) {
    resp.json().then(getallcoursesparsed);
}
function getallcourses() {
   var username = document.getElementById("loginusername").value;
   var password = document.getElementById("loginpassword").value;
    fetch("http://localhost:8000/admin/courses", {
        method : "GET",
        headers : {
            "Content-Type": "application/json",
            "username" : username,
            "password" : password
        }
    }).then(getcoursescallback);
}
