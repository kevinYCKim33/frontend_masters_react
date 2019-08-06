import React, { useState, useEffect } from "react";
import pet, { ANIMALS } from "@frontendmasters/pet";
import useDropdown from "./useDropdown";

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([]); // breeds will constantly change based on what animal type the user chose

  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);

  // disconnective from when the render is happening...
  // trigger when the render happens
  // the new componentDidMount
  // don't want to slow down the 1st render...
  // don't have them wait...like breadsticks at olive garden
  // useEffect() runs every time it renders...that's too much...
  //
  useEffect(() => {
    // pet.breeds("dog").then(console.log, console.error); // clever promise action
    setBreeds([]); //clear breeds;
    setBreed("");

    // given an animal type, it will return all its breeds
    // i.e. Animal: Dog ==> Breeds: "Corgi", "Husky", "Chihuahua"
    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings); //update breeds state with breedStrings
    }, console.error);
  }, [animal, setBreed, setBreeds]); // if any of these things change, trigger useEffect

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
