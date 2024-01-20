const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 3000;

app.use(bodyParser.json());
const url = "mongodb+srv://shaikadam642:PgHZU4iTiJtQlRgY@cluster0.wzj4d7w.mongodb.net/";
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
const todo = mongoose.model('Todo',todoScheme);
const user = mongoose.model('User',userschema);

app.post('/todos',(req,res) => {
    const newtodo = new todo({
        title: req.body.title,
        description: req.body.description
    })
    function callback()
    {
        console.log("created ");
    }
    newtodo.save().then(callback);

})
app.listen(port,()=> {
    console.log("listening");
})