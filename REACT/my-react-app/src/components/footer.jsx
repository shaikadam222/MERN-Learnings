import React from "react";
import ReactDom from "react-dom";

var year = new Date().getFullYear();
function footer() 
{
    return (
        <footer>
            <p >Copyright © {year}</p>
        </footer>
    )
}
export default footer;