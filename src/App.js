import React from "react";
// import ReactDOM from "react-dom"; // the more familiar syntax;
import { render } from "react-dom"; // i want to import JUST render from ReactDOM
import SearchParams from "./SearchParams";

const App = () => {
  return (
    <div>
      <h1 id="something-important">Adopt Me!</h1>
      <SearchParams />
    </div>
  );
};
// an App is like a stamp...it's useless without it being on something...
// createElement...is like stamping the thing onto the DOM
// components in react: something that returns markup;
render(
  <App />, // actually invokes the const App
  document.getElementById("root") // then mounts it onto the root div
);

// React.createElement(
//   type,
//   [props],
//   [...children] // if only putting one arg in...it'll take that as its children arg
// )

// i.e. React.createElement("div", {}, "hi")
// children // hi
