// // in params we send data through url 
// // example /todo/:id
// // and the url should looks like localhost/todo/3

// // in query we send through url
// // example /todo?id=3&id=4

// // the purpose of body parser is to extract body before it is logged or it is used
// //  what actually happens is body parser is a middlewear which means first middlewer gets executed before any 
// // function calls to have authentication and for varioud purposes and we use middlewears using
// // app.use("name of the middlewear") in this as we disccused body parser is a middle wear the usecase would be like thi
// // app.use(bodyparser)
// // this is an external lib build to do this job
// // and that is the reason we use body parser so that we can use the parameters present in the body

// //we can send data from server in plain text, html and JSON format
// //send data from server in json format "mand"
// // we can directly send html file in response using res.sendFile 

// // figure out new error that is 
// // in this lang we can't perform read operation right after perform write we can do that inside write operation
// // it is because writing is an aysnc function soo it can't perform writing and reading simultaneously the reason
// // why we are keeping it inside is becauseit considered as a single functino and follows top down approach to 
// // execute

// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const { dirname } = require("path");
// const port = 3000;

// app.use(bodyParser.json());

// // app.get("/add",(req,res) => {
// //     const a = parseInt(req.query.a);
// //     const b = parseInt(req.query.b);
// //     const c = a+b;
// //     res.send(`sum of give numbers is: ${c}`);
// // })

// // app.get('/subtract/:a/:b',(req,res) => {
// //     const a =parseInt(req.params.a);
// //     const b = parseInt(req.params.b);

// //     const c = a-b;
// //     res.send(`difference between given numbers is: ${c}`);
// // })


// function handlesum(counter)
// {
//     const c = counter*(counter+1)/2;
//     return c;
// }
// function handlemul(counter)
// {
//     var mul = 1;
//     for(var i=1;i<counter;i++)
//     {
//         mul*=i;
//     }
//     return mul;
// }
// // taking input using query
// // app.get('/handlesum',(req,res) => {
// //     const counter = parseInt(req.query.counter);
// //     res.send(`sum of the numers from 0 to ${counter} is: ${handlesum(counter)}`);
// // })

// // taking input using params
// // app.get('/handlesum/:counter',(req,res) => {
// //     const counter = parseInt(req.params.counter);
// //     res.send(`sum of numerb from 0 to ${counter} is: ${handlesum(counter)}`);
// // })

// //taking input using body
// app.get('/handlesum',(req,res) => {
//     // console.log(req.body);
//      var a = {
//         "sum": handlesum(req.query.counter),
//         "mul": handlemul(req.query.counter)
//      }
//      res.send(a);
// })


// app.get('/',(req,res) => {
//     res.sendFile(__dirname +"/index.html")
// })





// app.listen(3000,() => {
//     console.log(`Server is running on port ${port}`)
// });