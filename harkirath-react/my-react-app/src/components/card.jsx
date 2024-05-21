import React from "react";
import Detail from "./detail";

function Card(props)
{
  return (
    <div className="card">
        <div className="top">
          <h2 className="name">{props.name}</h2>
          <img
            src={props.src}
            alt={props.alt}
            className="circle-img"
          />
        </div>
        <div className="bottom">
          <Detail x = {props.x} tell = {props.tell} email = {props.email}/>
        </div>
      </div>
  );
}


export default Card;