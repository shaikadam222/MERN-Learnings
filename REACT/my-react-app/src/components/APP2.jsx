import React from "react";
import emojis from "../emojipedia"

function Card(props) {
    return (
        <div className="term">
          <dt>
            <span className="emoji" role="img" aria-label="Tense Biceps">
              {props.src}
            </span>
            <span>{props.name}</span>
          </dt>
          <dd>
            {props.desc}
          </dd>
        </div>
    )
}

function createcard(emoji)
{
    return (<Card key = {emoji.id} name = {emoji.name} desc = {emoji.meaning} src = {emoji.emoji}/>);
}

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>
      <dl className="dictionary">
        {emojis.map(createcard)}
        {/* <Card name = "Tense Biceps" desc = '“You can do that!” or “I feel strong!” Arm with tense biceps. Also used in connection with doing sports, e.g. at the gym.' src = "💪"/>
        <Card name = "Person With Folded Hands" desc = 'Two hands pressed together. Is currently very introverted, saying a prayer, or hoping for enlightenment. Is also used as a “high five” or to say thank you.' src = "🙏"/>
        <Card name = ">Rolling On The Floor, Laughing" desc = 'This is funny! A smiley face, rolling on the floor, laughing. The face is laughing boundlessly. The emoji version of “rofl“. Stands for „rolling on the floor, laughing“.' src = "🤣"/> */}
      </dl>
    </div>
  );
}

export default App;
