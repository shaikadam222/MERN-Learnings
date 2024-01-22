const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const jwt = require('jsonwebtoken')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const port = 3000;

app.use(bodyParser.json());
var tododb = "TodoDatabase";
const url = `mongodb+srv://shaikadam642:PgHZU4iTiJtQlRgY@cluster0.wzj4d7w.mongodb.net/+${tododb}`;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
const userschema = new mongoose.Schema({
    username : String,
    password: String
})
const todoScheme = new mongoose.Schema({
    id: ObjectId,
    title: String,
    description: String,
    published : Boolean
})
const todo = mongoose.model('Todo',todoScheme,'Todos');
const user = mongoose.model('User',userschema,'Users');

/////////////////////////////////////////////////// USER STUFF
let token;
function authenticate(req,res,next) {
    var obj = {
        username : req.body.username,
        password : req.body.password
    }
    // console.log(obj);
    var secretkey = "S3crEt";
    token = jwt.sign(obj,secretkey)
    // console.log(token);
    next();
}
app.post('/user/signup',authenticate,(req,res) => {
    if(token == undefined)
    {
        res.sendStatus(403);
    }
    else
    {
        var check = user.findOne({username : req.body.username})
        console.log(check.username)
        if(check != undefined)
        {
            const newuser = new user({
                username : req.body.username,
                password : token
            })
            
            
            // if(check.getQuery(user.username))
            newuser.save().then(()=> {
                console.log("user created");
            }).catch((error) => {
                console.log("error in saving");
            })
    
            res.send(newuser);
        }
        else
        {
            console.log("found user" + check.username)
        }
          
        

    }
})
/////////////////////////////////////////////////// TODOS STUFFF
app.post('/todos',(req,res) => {
    const newtodo = new todo({
        title: req.body.title,
        description: req.body.description
    })
    newtodo.save().then(() => {
        console.log("created ");
    });

})

app.listen(port,()=> {
    console.log("listening");
})