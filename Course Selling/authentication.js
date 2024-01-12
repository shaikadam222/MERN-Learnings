const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
var tokens = [];
// var obj = {
//     username :"shaik adam",
//     password : "123123"
// }
// var ans = jwt.sign(obj,"secretkey");
// console.log(ans)
// var secretkey = "secretkey";
// jwt.verify(ans,secretkey,(err,validity) => {
//     if(err)
//     {
//         throw err;
//     }
//     else
//     {
//         console.log(validity);
//     }
// });
function tokengeneration(req,res) {
    var username = req.body.username;
    var password = req.body.password;
    var secretkey = "secretkey";
    var obj = {
        username : username,
        password : password
    }
    var token = jwt.sign(obj,secretkey);
    console.log(token);
    return token
}
function adminauthentication(req,res,next) {
    
    var secretkey = "secretkey";
    var username = req.headers.username;
    var token = tokens[0];
    
    jwt.verify(token,secretkey,(err,validity) => {
        if(err) throw err;
        else
        {
            if(validity.username === username)
            {
                console.log("verified");
                next();
            }
            else
            {
                res.sendStatus(403);
            }
        }
        console.log(validity);
    })
}
app.post("/signup",(req,res) => {
    tokens.push(tokengeneration(req,res));
    console.log("Signned in successfully");
    res.send(tokengeneration(req,res));
})
app.post("/login",adminauthentication,(req,res) => {
    console.log("Loggedin successfully");
    res.sendStatus(200);
})
app.listen(port,() => {
    console.log("Listerning on 3000");
})