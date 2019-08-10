import React from "react";
import { Link } from "@reach/router"; //was kind of huge bug
// another "stamp" that's useless unless mounted on...
export default function Pet({ name, animal, breed, media, location, id }) {
  // es6 destructuring
  // create a variable name that will take on the value of the props object's name (key) value;
  // return React.createElement("div", {}, [
  //   React.createElement("h1", {}, name),
  //   React.createElement("h2", {}, animal),
  //   React.createElement("h2", {}, breed)
  // ]);

  // jsx just basically gets transpiled to React.createElement
  let hero = "http://placecorgi.com/300/300";

  if (media.length) {
    hero = media[0].small;
  }
  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1> {name} </h1>
        <h2> {`${animal} - ${breed} - ${location}`} </h2>
      </div>
    </Link>
  );
}

// when clicked on the <a>//the Reach Router hijacks it...

// <Link> </Link> vs <a> </a>
// Link uses history
// a will do a full page refresh classic html way...

// resets state and wipes out DOM

// so use Link for React-y SPA-y things!
