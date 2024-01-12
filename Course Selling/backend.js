const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { title } = require("process");
const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());

const admin = [];
const courses = [];
const users = [];
var x = Math.floor(Math.random() * 100) + 1;
///////////////////////////////////////////////////////////////  ADMIN SIGNUP ROUTE
app.post('/admin/signup', (req,res) => {
    var newadmin = {
        username: req.body.username,
        password: req.body.password
    }
    admin.push(newadmin);
    fs.writeFile("admin.json",JSON.stringify(admin), (err) => {
        if(err) throw err;
    })
    console.log("done");
    res.send(admin);
}) 
///////////////////////////////////////////////////////////////  ADMIN LOGIN ROUTE
app.post('/admin/login', (req,res) => {
    var temp = {
        username: req.headers.username,
        password: req.headers.password
    }
    fs.readFile("admin.json","utf-8",(err,data) => {
        if(err) throw err;

        var tempadmin = JSON.parse(data);
        console.log(tempadmin);
        var flag = 0;
        for(var i=0;i<tempadmin.length; i++)
        {
            if(tempadmin[i].username === temp.username && tempadmin[i].password === temp.password)
            {
                console.log("verified");
                flag = 1;
                res.send(JSON.parse(data));
            }
            
        }
        if(flag === 0)
        {  
            console.log("unauthorized");
            res.sendStatus(404);
        }
    })
})
///////////////////////////////////////////////////////////////  COURSE CREATION ROUTE
app.post('/admin/courses' , (req,res) => {
    var temp = {
        username: req.headers.username,
        password: req.headers.password
    }
    fs.readFile("admin.json","utf-8",(err,data) => {
        if(err) throw err;

        var tempadmin = JSON.parse(data);
        var flag = 0;
        for(var i=0;i<tempadmin.length; i++)
        {
            if(tempadmin[i].username === temp.username && tempadmin[i].password === temp.password)
            {
                console.log("verified");
                flag = 1;
                var newcourse = {
                    id: x,
                    title: req.body.title,
                    description: req.body.description,
                    price: req.body.price
                }
                console.log(newcourse)
                courses.push(newcourse);
                x++;
                fs.writeFile("courses.json", JSON.stringify(courses), (err) => {
                    if(err) throw err;
                    fs.readFile("courses.json", "utf-8", (err,data) => {
                        if(err) throw err;
                        console.log("course Created")
                        res.send(JSON.parse(data));
                    })
                })
            }
            
        }
        if(flag === 0)
        {  
            console.log("unauthorized");
            res.sendStatus(404);
        }
    })
})

///////////////////////////////////////////////////////////////  COURSE UPDATION ROUTE
function update(bodyholder,title)
{
    fs.readFile("courses.json","utf-8",(err,data) => {
        var coursedata = JSON.parse(data);
        for(var j=0;j<coursedata.length;j++)
        {
            if(title === coursedata[j].title)
            {
                coursedata[j].title = bodyholder.title;
                coursedata[j].description = bodyholder.description;
                coursedata[j].price = bodyholder.price;

                console.log("course updated");
                fs.writeFile("courses.json", JSON.stringify(coursedata), (err) => {
                    if(err) throw err;
                    return coursedata;
                })
            }
        }
    })
}
app.put('/admin/courses/:title', (req,res) => {
    var temp = {
        username: req.headers.username,
        password: req.headers.password
    }
    fs.readFile("admin.json","utf-8",(err,data) => {
        if(err) throw err;

        var tempadmin = JSON.parse(data);
        console.log(tempadmin);
        var flag = 0;
        for(var i=0;i<tempadmin.length; i++)
        {
            if(tempadmin[i].username === temp.username && tempadmin[i].password === temp.password)
            {
                console.log("verified");
                flag = 1;
                var bodyholder = {
                    title : req.body.title,
                    description : req.body.description,
                    price : req.body.price
                }
                res.send(JSON.stringify(update(bodyholder,req.params.title)));
            }
            
        }
        if(flag === 0)
        {  
            console.log("unauthorized");
            res.sendStatus(404);
        }
    })
})

///////////////////////////////////////////////////////////////  GET ALL COURSES
app.get("/admin/courses" , (req,res) => {
    var temp = {
        username: req.headers.username,
        password: req.headers.password
    }
    console.log(temp);
    fs.readFile("admin.json","utf-8",(err,data) => {
        if(err) throw err;

        var tempadmin = JSON.parse(data);
        console.log(tempadmin);
        var flag = 0;
        for(var i=0;i<tempadmin.length; i++)
        {
            if(tempadmin[i].username === temp.username && tempadmin[i].password === temp.password)
            {
                console.log("verified");
                flag = 1;
                fs.readFile("courses.json","utf-8", (err,data) => {
                    res.send(JSON.parse(data));
                })
            }
            
        }
        if(flag === 0)
        {  
            console.log("unauthorized");
            res.sendStatus(404);
        }
    })
})

/////////////////////////////////////////////////////////////////////// USER PART
/////////////////////////////////////////// USER CREATION
app.post('/users/signup', (req,res) => {
    var newuser = {
        username : req.body.username,
        password : req.body.password
    }
    users.push(newuser);
    fs.writeFile("users.json", JSON.stringify(users), (err) => {
        if(err) throw err;
        console.log("User Created Successfully");
        res.send(newuser);
    })
})
/////////////////////////////////////////// USER LOGIN
app.post('/users/login', (req,res) => {
    var curruser = {
        username : req.headers.username,
        password : req.headers.password
    }
    var flag2 = 0;
    fs.readFile("users.json","utf-8", (err,data) => {
        if(err)
        {
            res.sendStatus(500);
            return;
        }
        var tempusers = JSON.parse(data);
        for(var i=0;i<tempusers.length;i++)
        {
            if(tempusers[i].username === curruser.username && tempusers[i].password === curruser.password)
            {
                console.log("LOGGED IN SUCCESSFULLY");
                flag2 = 1;
                res.send(curruser);
                return;
            }
        }
        if(flag2!=1)
        {
            console.log("unauthorized");
            res.sendStatus(404);
        }
    })
})
/////////////////////////////////////////// USER COURSE PURCHASE
function findcourse(title,callback) 
{
    fs.readFile("courses.json", "utf-8", (err,data) => {
        if(err) throw err;
        var tempcourses = JSON.parse(data);
        for(var i=0;i<tempcourses.length;i++)
        {
            if(tempcourses[i].title === title)
            {
                callback(null,tempcourses[i].description);   
                return;
            }
        }
        callback("course not found",null);
    })
}
function finduser(username) 
{
    fs.readFile('users.json',"utf-8", (err,data) => {
        if(err) throw err;
        var tempusers = JSON.parse(data);
        for(var i=0;i<tempusers.length;i++)
        {
            if(username === tempusers[i].username)
            {
                var curruser = {
                    username : username,
                    coursename : tempusers[i].coursename,
                    coursedescription : tempusers[i].coursedescription
                }
                return curruser;
            }
        }
    })
}
app.post('/users/:title', (req,res) => {
    var curruser = {
        username : req.headers.username,
        password : req.headers.password
    }
    var flag2 = 0;
    fs.readFile("users.json","utf-8", (err,data) => {
        var tempusers = JSON.parse(data);
        for(var i=0;i<tempusers.length;i++)
        {
            if(tempusers[i].username === curruser.username && tempusers[i].password === curruser.password)
            {
                console.log("LOGGED IN SUCCESSFULLY");
                const tempname = tempusers[i].username;
                flag2 = 1;
                var usercourse = [];
                var coursetitle = req.params.title;
                fs.readFile("courses.json","utf-8",(err,data) => {
                    if(err)
                    {
                        res.sendStatus(500);
                        return
                    }
                    else
                    {
                        var tempcourses = JSON.parse(data);
                        for(var j=0;j<tempcourses.length;j++)
                        {
                            if(coursetitle === tempcourses[j].title)
                            {
                                usercourse = {
                                    username : tempname,
                                    coursetitle : tempcourses[j].title,
                                    coursedescription : tempcourses[j].description
                                }
                                console.log(usercourse)
                                res.send(usercourse)
                                fs.readFile("usercourses.json","utf-8", (err,data) => {
                                    if(err) 
                                    {
                                        res.sendStatus(500);
                                        return;
                                    }
                                    else
                                    {
                                        var tempuserdata = JSON.parse(data);
                                        tempuserdata.push(usercourse);
                                        fs.writeFile("usercourses.json",JSON.stringify(tempuserdata), (err) => {
                                            if(err)
                                            {
                                                res.sendStatus(500);
                                                return;
                                            }
                                        })
                                    }
                                })
                                console.log("PURCHASE SUCCESSFULL");
                                return;
                            }
                        }
                    }
                })
            }  
        }
        if(flag2!=1)
        {
            console.log("unauthorized");
            return;
        }
    })
})
/////////////////////////////////////////// USER COURSES
var tempusercourse = [];
app.get("/users/courses",(req,res) => {
    var curruser = {
        username : req.headers.username,
        password : req.headers.password
    }
    var flag2 = 0;
    fs.readFile("users.json","utf-8", (err,data) => {
        var tempusers = JSON.parse(data);
        for(var i=0;i<tempusers.length;i++)
        {
            if(tempusers[i].username === curruser.username && tempusers[i].password === curruser.password)
            {
                console.log("LOOGED IN SUCCESSFULLY");
                flag2 = 1;
                fs.readFile("usercourses.json","utf-8",(err,data) => {
                    if(err) throw err;
                    var tempdata = JSON.parse(data);
                    for(var i=0;i<tempdata.length;i++)
                    {
                        if(req.headers.username === tempdata[i].username)
                        {
                            var obj = {
                                username : req.headers.username,
                                coursetitle : tempdata[i].coursetitle,
                                coursedescription : tempdata[i].coursedescription
                            }
                            tempusercourse.push(obj);
                            res.send(tempusercourse);
                            return;
                        }
                    }
                })
            }
        }
        if(flag2!=1)
        {
            console.log("unauthorized");
            res.sendStatus(404);
        }
    })
})
///////////////////////////////////// OPTION PAGE
// app.post("/options",(req,res) => {
//     var username = req.body.username;
//     var password = req.body.password;
//     fs.readFile("curradmin.json","utf-8",(err,data) => {
//         if(err)
//         {
//             res.sendStatus(500);
//             return;
//         }
//         else
//         {
//             var curradmin = {
//                 username : username,
//                 password : password
//             }
//             fs.writeFile("curradmin.json",JSON.stringify(curradmin),(err) =>{
//                 if(err) throw err;
//             })
//             console.log("verified");
//             res.sendStatus(200);
//         }
//     })
// })
app.listen(port, () => {
    console.log("Listening on 8000");
})