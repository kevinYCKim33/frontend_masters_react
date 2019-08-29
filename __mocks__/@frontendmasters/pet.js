// import { readFileSync } from "fs";
// import path from "path";
// import { act } from "@testing-library/react";

// const breeds = [
//   { name: "Bichon Frise" },
//   { name: "Bolognese" },
//   { name: "Coton de Tulear" },
//   { name: "Havanese" },
//   { name: "Maltese" }
// ];

// // node magic...get right file from directory...
// const doggos = JSON.parse(
//   readFileSync(path.join(__dirname, "res.json")).toString()
// );

// export const ANIMALS = ["dog", "cat", "bird"];
// export const _breeds = breeds; // _ for alerting testing just syntactic nomer
// export const _dogs = doggos.animals;

// const mock = {
//   breeds: jest.fn(() => {
//     return {
//       then: callback => act(() => callback({ breeds }))
//     };
//   }),
//   animals: jest.fn(() => {
//     return {
//       then: callback => act(() => callback(doggos))
//     };
//   })
// };

// // creating a mock library of pet...
// // has a breeds function...
// // breeds is a spy function...
// // going to run this return function...
// // which will return promise like object...
// //
// export default mock;
import { readFileSync } from "fs";
import path from "path";
import { act } from "@testing-library/react";

const breeds = [
  { name: "Bichon Frise" },
  { name: "Bolognese" },
  { name: "Bolonka" },
  { name: "Coton de Tulear" },
  { name: "Havanese" },
  { name: "Lowchen" },
  { name: "Maltese" }
];

const doggos = JSON.parse(
  readFileSync(path.join(__dirname, "res.json")).toString()
);

export const ANIMALS = ["dog", "cat", "bird"];
export const _breeds = breeds;
export const _dogs = doggos.animals;

const mock = {
  breeds: jest.fn(() => {
    return {
      then: callback =>
        act(() => {
          callback({
            breeds
          });
        })
    };
  }),
  animals: jest.fn(() => {
    return {
      then: callback =>
        act(() => {
          callback(doggos);
        })
    };
  })
};

export default mock;
