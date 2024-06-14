import React from "react";

function Detail(props)
{
    return (
        <div>
            <p className="info">{props.x}</p>
            <p className="info">{props.tell}</p>
            <p className="info">{props.email}</p>
        </div>
    );
}

export default Detail;