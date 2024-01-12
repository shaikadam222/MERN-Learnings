const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const fs = require("fs");
const port = 3000;

app.use(bodyParser.json());
var n=0;
var todos = [];

function findatindex(todos,id)
{
    for(var i=0;i<todos.length;i++)
    {
        if(todos[i].id === id)
        {
            return i;
        }
    }
    return -1;
}

function removeatindex(todos,x)
{
    let arr = [];
    for(var i=0;i<todos.length;i++)
    {
        if(todos[i].id != x)
        {
            arr.push(todos[i]);
        }
    }
    return arr;
}

app.post('/todos',(req,res) => {
    var newtodo = {
        id : req.body.id,
        desc : req.body.desc
    }
    n++;
    todos.push(newtodo);
    res.send(todos);
})

app.get('/todos', (req,res) => {
    res.send(todos);
}) 

app.get('/todos/:id', (req,res) => {
    var x = findatindex(todos,parseInt(req.params.id));
    if(x === -1)
    {
        res.sendStatus(404)
    }
    res.send(todos[x]);
})

app.put('/todos/:id',(req,res) => {
    var x = findatindex(todos,parseInt(req.params.id));
    todos[x].id = parseInt(req.body.id);
    todos[x].desc = req.body.desc;

    res.send(todos[x]);
})

app.delete('/todos/:id', (req,res) => {
    var x = findatindex(todos,parseInt(req.body.id));
    if(x === -1)
    {
        res.sendStatus(404);
    }
    else
    {
        todos = removeatindex(todos,x);
    }
    res.send(todos);
})
app.listen(port, () => {
    console.log(`Listnening on ${port}`);
})