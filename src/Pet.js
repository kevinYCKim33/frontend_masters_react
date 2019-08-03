import React from "react";
// another "stamp" that's useless unless mounted on...
export default function Pet({ name, animal, breed }) {
  // es6 destructuring
  // create a variable name that will take on the value of the props object's name (key) value;
  // return React.createElement("div", {}, [
  //   React.createElement("h1", {}, name),
  //   React.createElement("h2", {}, animal),
  //   React.createElement("h2", {}, breed)
  // ]);

  // jsx just basically gets transpiled to React.createElement
  return (
    <div>
      <h1>Name: {name}</h1>
      <h2>{animal}</h2>
      <h2>{breed}</h2>
    </div>
  );
}
