const bodyParser = require("body-parser");
const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const fs = require("fs");
const { title } = require("process");
const { decode } = require("punycode");
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

const admin = [];
const courses = [];
const users = [];
var token;
var x = Math.floor(Math.random() * 100) + 1;
function authenticatin(req,res,next) {
    var userobj = {
        username : req.body.username,
        password : req.body.password
    }
    var secretkey = "SecretKey";
    token = jwt.sign(userobj,secretkey);
    req.authenticatinData = token;
    next();
}
function adminauthentication(req,res,next) {
    var auth = token;
    console.log(auth);
    var secretkey = "SecretKey"
    jwt.verify(auth,secretkey,(err,decoded) => {
        if(err)
        {
            console.log("Error in decoding");
            next();
        }
        else
        {
            console.log("decoded succefully");
            res.send(decoded);
        }
    })
}
///////////////////////////////////////////////////////////////  ADMIN SIGNUP ROUTE
app.post('/admin/signup', authenticatin,(req,res) => {
    var newadmin = {
        username: req.body.username,
        password: req.body.password
    }
    admin.push(newadmin);
    var token = req.authenticatinData;
    console.log(token);
    res.send(token);
}) 
///////////////////////////////////////////////////////////////  ADMIN LOGIN ROUTE
app.post("/admin/login",adminauthentication,(req,res) => {
    res.sendStatus(403);
})
app.listen(port,() => {
    console.log("Listnening on 3000");
})
