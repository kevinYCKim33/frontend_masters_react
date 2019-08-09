import React, { useState, useEffect } from "react"; // using Hooks
import pet, { ANIMALS } from "@frontendmasters/pet"; // some cool fetcher from FEM
import Results from "./Results"; // results from the search submittal
import useDropdown from "./useDropdown"; // custom hook for our two dropdowns

const SearchParams = () => {
  const [location, setLocation] = useState("Seattle, WA"); // location will be updated via the setLocation action; default location is Seattle
  const [breeds, setBreeds] = useState([]); // breeds will constantly change based on what animal type the user chose
  // breeds defaults to empty array, not quite sure why...
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  // useDropdown(label, defaultState, options)
  // returns [state, Dropdown, setState]
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  // why setBreed here but no setAnimal?
  // to reconcile the fact that changing AnimalDropdown will change the
  const [pets, setPets] = useState([]);

  // async functins always returns a promise
  // superpower you get is await
  // pet.animals gives you a promise...
  // wait for it, then assign its response's animal key to animals variable
  async function requestPets() {
    // pet.animals({location, breed, type}) will fetch back a list of actual animals that belong to that particular location, breed, and type
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal
    });

    setPets(animals || []); // get actual pets...i.e. Bokshil, Bokdong, Yongshim, and set that to pets state
    // if animals are zilch... i.e. There are no Rat Terrier in SF...return an empty array
  }
  // useEffect: the new componentDidMount
  // disconnective from when the render is happening...
  // trigger when the render happens
  // don't want to slow down the 1st render...
  // don't have them wait...like breadsticks at olive garden
  // useEffect() by default runs every time it renders...that's too much...
  //
  useEffect(() => {
    // pet.breeds("dog").then(console.log, console.error); // clever promise action
    setBreeds([]); //clear breeds options in the dropdown;
    setBreed(""); // breeds dropdown defaults to All

    // given an animal type, it will return all its breeds
    // i.e. Animal: Dog ==> Breeds: "Corgi", "Husky", "Chihuahua"
    // pet: API that where you go pet.breeds('Dog') it will return back a bunch of its breeds as a resolved promise
    pet.breeds(animal).then(({ breeds }) => {
      const breedStrings = breeds.map(({ name }) => name);
      setBreeds(breedStrings); //update breeds state with breedStrings
      // breeds will now have <options> </options> of bunch of breeds... <options>Corgi</options> <options> Golden Retriever </options>
    }, console.error);
  }, [animal, setBreed, setBreeds]); // if any of these things change, trigger useEffect
  // Holt thinks setBreed and setBreeds being in there is kinda stupid...only animal should really change here...
  // }, []) // if you only need to have it run only once...
  // i.e. jquery integration...or D3 integration...
  // }) // if you want it to run every time it renders...(not the most performant...)
  return (
    <div className="search-params">
      <h1> {location} </h1>
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        {/* on submmit it will trigger requestPets an async function */}
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={e => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown /> {/* Essentially Dropdown with Animal spin to it */}
        <BreedDropdown /> {/* */}
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;
