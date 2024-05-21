import { describe } from "node:test";
import { title } from "process";
import React from "react";
import { useEffect } from "react";

function App() {
    const [todoForToday , setTododToday] = React.useState({
        title : "Go ot gym",
        description : "Go by 7",
        id : 1
    },
    {
        title : "Go to class",
        description : "Go fast",
        id : 2
    }
);


    setInterval(() => {
        setTododToday({
            title : "Got ot gym" + Math.random(),
            description : "Go fast",
            id : 1
        })
    },1000)



    return (
        <div>
            {JSON.stringify(todos)}
        </div>
    )
}

export default App;