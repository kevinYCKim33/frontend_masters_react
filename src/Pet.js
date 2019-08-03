import React from "react";
// another "stamp" that's useless unless mounted on...
export default function Pet({ name, animal, breed }) {
  // es6 destructuring
  // create a variable name that will take on the value of the props object's name (key) value;
  return React.createElement("div", {}, [
    React.createElement("h1", {}, name),
    React.createElement("h2", {}, animal),
    React.createElement("h2", {}, breed)
  ]);
}
