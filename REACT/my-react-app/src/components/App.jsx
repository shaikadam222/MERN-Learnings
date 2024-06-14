import React from "react";
import Card from "./card";
import contacts from "../contacts";
function createcard(contact)
{
  return (
    <Card 
      key = {contact.id}
      x={contact.id}
      name = {contact.name}
      src =  {contact.imgURL}
      tell = {contact.phone}
      email = {contact.email} />
  )
}


function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>
      {contacts.map(createcard)};
    </div>
  );
}

export default App;
