import React from "react";
import ReactDom from "react-dom";

var time = new Date().getHours;
time = 1;
if(time < 12)
{
    var greet = "GOOD MORNING";
    var style = {
        color : "orange"
    }
}
else if(time >=12 && time < 17)
{
    var greet = "GOOD AFTERNOON";
    var style = {
        color : "red"
    }
}
else
{
    var greet = "GOOD EVENING";
    var style = {
        color : "blue"
    }
}
function App()
{
    return <h1 style={style}>{greet}</h1>
}

export default App;