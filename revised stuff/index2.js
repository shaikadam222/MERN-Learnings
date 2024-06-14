function callthis(jsonbody)
{
    console.log(jsonbody);
}
function callbackfn(result)
{
     result.json().then(callthis);
}

var obj = {
    method: "GET"
}

fetch("http://localhost:3000/handlesum?counter=10", obj).then(callbackfn);