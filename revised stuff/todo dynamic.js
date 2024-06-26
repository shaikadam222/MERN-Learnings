const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path")
const cors = require("cors");
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
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
        title: req.body.title,
        desc : req.body.desc
    }
    n++;
    todos.push(newtodo);
    fs.writeFile("todofiles.json",JSON.stringify(todos), (err) => {
        if(err)
        {
            res.sendStatus(500);
        }
        else
        {
            fs.readFile("todofiles.json","utf-8",(err,data) => {
                if(err)
                {
                    res.sendStatus(500);
                }
                else
                {
                    res.send(JSON.parse(data));
                }
            })
        }
})
})
app.get('/todos', (req,res) => {
    fs.readFile("todofiles.json","utf-8",(err,data) => {
        
        res.send(JSON.parse(data));
    })
}) 

app.get('/todos/:id', (req,res) => {
    fs.readFile("todofiles.json","utf-8", (err,data) => {
        if(err)
        {
            throw err;
        }
        else
        {
            todos = JSON.parse(data);
            var x = findatindex(todos,parseInt(req.params.id));
            if(x === -1)
            {
                res.sendStatus(404);
            }
            res.send(todos[x]);
        }
    })
})

app.put('/todos/:id',(req,res) => {
    fs.readFile("todofiles.json","utf-8",(err,data) => {
        if(err)
        {
            console.log("error in file reading");
            res.sendStatus(500);
        }
        else
        {
            todos = JSON.parse(data);
            let x = req.params.id;
            if(x === -1)
            {
                console.log("can't find index");
                res.sendStatus(500);
            };
            for(var i=0;i<todos.length;i++)
            {
                if(todos[i].id == x)
                {
                    todos[i].id = req.body.id;
                    todos[i].desc = req.body.desc;
                    fs.writeFile("todofiles.json",JSON.stringify(todos),(err) => {
                        if(err)
                        {
                            console.log("Error in wrting file");
                            res.sendStatus(500);
                        }
                        res.send(todos);
                    })
                    
                }
            }
            
        }
    })
})

app.delete('/todos/:id', (req,res) => {
    let x = req.params.id;
    fs.readFile("todofiles.json","utf-8", (err,data) => {
        if(err)
        {
            console.log("error in reading file");
        }
        else
        {
            todos = JSON.parse(data);
            todos = removeatindex(todos,x);
            fs.writeFile("todofiles.json",JSON.stringify(todos), (err) => {
                if(err)
                {
                    console.log("error in writing file");
                    res.sendStatus(500);
                }
            })
            res.send(todos);
        }
    })
})
app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname,"index.html"));
})
app.listen(port, () => {
    console.log(`Listnening on ${port}`);
})