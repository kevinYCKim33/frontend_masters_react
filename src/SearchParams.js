import React, { useState } from "react";
import { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";

const SearchParams = () => {
  // my first hook
  // all hooks start with use

  // get stateful logic with hooks
  const [location, setLocation] = useState("Seattle, WA");
  // location: current state of location;
  // setLocation: updater for that particular piece of state;
  // useState(defaultState);
  // const [animal, setAnimal] = useState("dog");
  // const [breed, setBreed] = useState("");

  const [breeds, setBreeds] = useState([]); // breeds will constantly change based on what animal type the user chose
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown] = useDropdown("Breed", "", breeds);
  // low-key i think this is how i can potentially refactor created, djs dropdown

  // const [state, updater] = useState // always something that returns an array

  // no more setState!!!

  // hooks never go inside for loops or if statements!!!
  // hooks keep track of order

  return (
    <div className="search-params">
      <h1> {location} </h1>
      <form>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={e => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;

// clicking on Label highlights the input when nested this way...
// pretty good for accessbility

// ES6 array destructuring
// var arr = ["monkey", "kevin"];
// const [animal, person] = arr;
//
// console.log(animal) // monkey
// console.log(person) // kevin

// every event triggers react app to rendering everything... according to him...
