import { createStore } from "redux";
import reducer from "./reducers";

const store = createStore(
  reducer,

  typeof window === "object" &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : f => f
);

export default store;

// one root reducer...
// the hooks reducer will look exactly the same...

// takes in old state, and gives you new state;
