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
    password: String,
    token: String
})
const todoScheme = new mongoose.Schema({
    id: Number,
    title: String,
    description: String,
    published : Boolean
})
const todo = mongoose.model('Todo',todoScheme,'Todos');
const user = mongoose.model('User',userschema,'Users');

/////////////////////////////////////////////////// USER STUFF
function authenticate(req,res,next) {
    var str = " ";
    var obj = {
        username : req.body.username,
        password : req.body.password,
        token : str
    }
    // console.log(obj);
    var secretkey = "S3crEt";
    req.token = jwt.sign(obj,secretkey)
    obj.token = req.token
    // console.log(token);
    next();
}
app.post('/user/signup',authenticate,async (req,res) => {
    if(req.token == undefined)
    {
        res.sendStatus(403);
    }
    else
    {
        var check = await user.findOne({username : req.body.username})
        // console.log(check)
        if(check)
        {
            console.log("found user" + check.username)
            res.status(500).send("Username already exists")
        }
        else
        {
            const newuser = new user({
                username : req.body.username,
                password : req.body.password,
                token : req.token
            })
            
            
            // if(check.getQuery(user.username))
            await newuser.save().then(()=> {
                console.log("user created");
            }).catch((error) => {
                console.log("error in saving");
            })
            res.send(newuser);
        }
          
        

    }
})
///////////////////////////////////////////////////  user login
app.post('/user/login' ,async(req,res) => {
    let check = await user.findOne({username: req.body.username})
    if(check != undefined)
    {
        if(check.username == req.body.username && check.password === req.body.password)
        {
            return res.status(200).send("logged in successfully");
        }
        else
        {
            return res.status(401).send("invalid credentials");
        }
    }
    else
    {
        res.status(403).send("username doesn't exits");
    }
})
/////////////////////////////////////////////////// TODOS STUFFF
app.post('/user/todos',async (req,res) => {
    const newtodo = new todo({
        id : req.body.id,
        title: req.body.title,
        description: req.body.description
    })
   await newtodo.save().then(() => {
        console.log("created ");
        res.status(200).send(newtodo);
    }); 
})
app.get('/user/todos',async(req,res) => {
    let check = await  todo.find()
    if(check == undefined)
    {
        res.status(403).send("no todos available");
    }
    else
    {
        res.status(200).send(check)
    }
})
app.put('/user/todos/:id',async (req,res) => {
    let check = await todo.find({id : req.params.id})
    if(check == undefined)
    {
        res.status(404).send("Todo can't find");
    }
    else
    {
        check.title = req.body.title;
        check.description = req.body.description;

        console.log(check);
        res.send(check);
    }
})
app.listen(port,()=> {
    console.log("listening");
})