import React, { useState, lazy, Suspense } from "react";
// import ReactDOM from "react-dom"; // the more familiar syntax;
import { render } from "react-dom"; // i want to import JUST render from ReactDOM
import SearchParams from "./SearchParams";
import { Router, Link } from "@reach/router";
import _ from "lodash";
import moment from "moment";
// Reach will show the one that matches the most
// React Router will show everything that matches
// Reach has some cool scoring algorithm
// "/details/:id" vs "/details/4"
// Reach router will give priority to /details/4
// React router will render both /:id and /4
// Reach sounds a bit better

const Details = lazy(() => import("./Details"));
// dynamically import this somewhere...
// import Details from "./Details";
/// <Suspense fallback>...</Suspense> until '...' finishes loading...show its fallback
// Suspense can just be a top level thing...
// or use Suspense everywhere...

// code split not worth for <30kb
import ThemeContext from "./ThemeContext";

const App = () => {
  // usually const [state, setState] = useState(defaultValue)
  const themeHook = useState("peru");
  // themeHook // ["darkblue", f]
  return (
    <React.StrictMode>
      <ThemeContext.Provider value={themeHook}>
        <div>
          <header>
            <Link to="/"> Adopt Me! </Link>
          </header>
          <Suspense fallback={<h1>loading route ...</h1>}>
            <Router>
              <SearchParams path="/" />
              <Details path="/details/:id" />
            </Router>
          </Suspense>
        </div>
      </ThemeContext.Provider>
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
