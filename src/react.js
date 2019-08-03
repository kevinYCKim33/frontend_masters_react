// your code is going to go here
const App = () => {
  return React.createElement(
    "div",
    {},
    React.createElement("h1", {}, "Adopt Me!")
  );
};
// an App is like a stamp...it's useless without it being on something...
// createElement...is like stamping the thing onto the DOM
// components in react: something that returns markup;
ReactDOM.render(
  React.createElement(App), // actually invokes the const App
  document.getElementById("root") // then mounts it onto the root div
);

// React.createElement(
//   type,
//   [props],
//   [...children]
// )
