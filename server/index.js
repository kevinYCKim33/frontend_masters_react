// https://btholt.github.io/complete-intro-to-react-v5/ssr
import express from "express";
import React from "react";
// import { renderToString } from "react-dom/server";
import { renderToNodeStream } from "react-dom/server"; //
// old idea: 1 big payload
// new idea: do piece by piece

import { ServerLocation } from "@reach/router";
import fs from "fs";
import App from "../src/App";

const PORT = process.env.PORT || 3000;

const html = fs.readFileSync("dist/index.html").toString();

const parts = html.split("not rendered");

const app = express();

app.use("/dist", express.static("dist"));

// old version
// app.use((req, res) => {
//   const reactMarkup = (
//     <ServerLocation url={req.url}>
//       <App />
//     </ServerLocation>
//   );
//
//   res.send(parts[0] + renderToString(reactMarkup) + parts[1]);
//
//   res.end();
// });

// new version with node stream
app.use((req, res) => {
  res.write(parts[0]);
  const reactMarkup = (
    <ServerLocation url={req.url}>
      <App />
    </ServerLocation>
  );

  const stream = renderToNodeStream(reactMarkup);

  stream.pipe(
    res,
    { end: false }
  );

  stream.on("end", () => {
    res.write(parts[1]);
    res.end();
  });
});

console.log("listening on " + PORT);
app.listen(PORT);
