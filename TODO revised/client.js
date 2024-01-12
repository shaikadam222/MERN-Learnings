getdata();
    //////////////////////////   get stufff ////////////////////////////
    function getresponce(data) {
        console.log(data);
        var parentelement = document.getElementById("mainarea");
        parentelement.innerHTML = "";
        for(var i=0;i<data.length;i++)
        {
            var childEllement = document.createElement("div");

            var grandchild1 = document.createElement("span");
            grandchild1.innerHTML = data[i].id;
            grandchild1.classList.add("id");

            var grandchild2 = document.createElement("span");
            grandchild2.innerHTML = data[i].title;
            grandchild2.classList.add("title")

            var grandchild3 = document.createElement("span");
            grandchild3.innerHTML = data[i].desc;
            grandchild3.classList.add("desc")

            childEllement.append(grandchild1);
            childEllement.append(grandchild2);
            childEllement.append(grandchild3);

            parentelement.appendChild(childEllement)
        }
        
    }
    function getcallback(resp) {
        resp.json().then(getresponce);
    }
    function getdata() {
        fetch("http://localhost:3000/todos", {
            method : "GET"
        }).then(getcallback);
    }
    ////////////////////////////////// POST STUFFFFF ///////////////////////////////////
    function parsedresponse(data) {
        console.log(data[data.length - 1].title);
        var parentelement = document.getElementById("mainarea");
        var childEllement = document.createElement("div");

            var grandchild1 = document.createElement("span");
            grandchild1.innerHTML = data[data.length - 1].id;
            grandchild1.classList.add("id");

            var grandchild2 = document.createElement("span");
            grandchild2.innerHTML = data[data.length - 1].title;
            grandchild2.classList.add("title")

            var grandchild3 = document.createElement("span");
            grandchild3.innerHTML = data[data.length - 1].desc;
            grandchild3.classList.add("desc")

            childEllement.append(grandchild1);
            childEllement.append(grandchild2);
            childEllement.append(grandchild3);

            parentelement.appendChild(childEllement)
    }
    function callback(resp) {
        resp.json().then(parsedresponse);
    }
    function postdata() {
        var id = document.getElementById("id").value;
        var title = document.getElementById("title").value;
        var desc = document.getElementById("desc").value;

        fetch("http://localhost:3000/todos" , {
            method: "POST",
            body: JSON.stringify({
                id: id,
                title: title,
                desc: desc  
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(callback);
    }
    //////////////////////   DELETE STUFF ////////////////////
    function delresponce(data)
    {
        console.log("done");
        getdata();
    }
    function delcallback(resp) {
        resp.json().then(delresponce);
    }
    function deletedata() {
        var id = document.getElementById("delete").value;
        console.log(id);
        fetch(`http://localhost:3000/todos/${id}` , {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(delcallback);
    }
    /////////////////////// PUT STUFF ////////////////////////
    function putresponse(data) {
        console.log("updated");
        getdata();
    }
    function putcallback(resp) {
        resp.json().then(putresponse);
    }
    function putdata() {
        var id = document.getElementById("putid").value; 
        var title = document.getElementById("puttitle").value;
        var desc = document.getElementById("putdesc").value;
        var val  = {
            id: id,
            title: title,
            desc: desc
        }
        fetch(`http://localhost:3000/todos/${id}`, {
            method: "PUT",
            body: JSON.stringify(val),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(putcallback);
        
    }
    