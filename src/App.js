import React from "react";
// import ReactDOM from "react-dom"; // the more familiar syntax;
import { render } from "react-dom"; // i want to import JUST render from ReactDOM
import SearchParams from "./SearchParams";
import { Router, Link } from "@reach/router";
// Reach will show the one that matches the most
// React Router will show everything that matches
// Reach has some cool scoring algorithm
// "/details/:id" vs "/details/4"
// Reach router will give priority to /details/4
// React router will render both /:id and /4
// Reach sounds a bit better

import Details from "./Details";

const App = () => {
  return (
    <React.StrictMode>
      <div>
        <header>
          <Link to="/"> Adopt Me! </Link>
        </header>
        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
        </Router>
      </div>
    </React.StrictMode>
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
