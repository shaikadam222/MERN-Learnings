import React from "react";
import ReactDOM from "react-dom";
import Heading from "./components/heading";

var x = true;
var style = {
    color : "red"
}
if(x)
{
    style.color = "red"
}
else
{
    style.color = "orange"
}
ReactDOM.render(
    <Heading />
    ,document.getElementById("root"));