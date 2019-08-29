import { combineReducers } from "redux";
import location from "./location";
import theme from "./theme";

export default combineReducers({
  location,
  theme
});

//combineReducers;

// redux store really large object...
// a tree of data
