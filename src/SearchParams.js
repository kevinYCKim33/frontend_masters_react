import React, { useState, useEffect } from "react"; // using Hooks
import pet, { ANIMALS } from "@frontendmasters/pet"; // some cool fetcher from FEM
import { connect } from "react-redux";
import Results from "./Results"; // results from the search submittal
import useDropdown from "./useDropdown"; // custom hook for our two dropdowns
import changeTheme from "./actionCreators/changeTheme";
import changeLocation from "./actionCreators/changeLocation";
// import ThemeContext from "./ThemeContext";

const SearchParams = props => {
  // const [location, setLocation] = useState("Seattle, WA"); // location will be updated via the setLocation action; default location is Seattle
  const [breeds, setBreeds] = useState([]); // breeds will constantly change based on what animal type the user chose
  // breeds defaults to empty array, not quite sure why...
  const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
  // useDropdown(label, defaultState, options)
  // returns [state, Dropdown, setState]
  const [breed, BreedDropdown, setBreed] = useDropdown("Breed", "", breeds);
  // why setBreed here but no setAnimal?
  // to reconcile the fact that changing AnimalDropdown will change the
  const [pets, setPets] = useState([]);
  // const [theme, setTheme] = useContext(ThemeContext); // an alternative to avoiding prop drilling
  // useContext(ThemeContext): just returns X from <ThemeContext.Provider value={X}>

  // theme // "darkblue"
  // WAS NOT PASSED ANYTHING FROM APP but was able to bypass the explicit pass down via context

  // async functins always returns a promise
  // superpower you get is await
  // pet.animals gives you a promise...
  // wait for it, then assign its response's animal key to animals variable
  async function requestPets() {
    // pet.animals({location, breed, type}) will fetch back a list of actual animals that belong to that particular location, breed, and type
    const { animals } = await pet.animals({
      location: props.location,
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
      <h1> {props.location} </h1>
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
            value={props.location}
            placeholder="Location"
            onChange={e => props.updateLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown /> {/* Essentially Dropdown with Animal spin to it */}
        <BreedDropdown /> {/* */}
        <label htmlFor="theme">
          Theme
          <select
            value={props.theme}
            onChange={e => props.setTheme(e.target.value)}
            onBlur={e => props.setTheme(e.target.value)}
          >
            <option value="peru">Peru </option>
            <option value="darkblue">Dark Blue </option>
            <option value="mediumorchid">Medium Orchid </option>
            <option value="chartreuse">Chartreuse </option>
          </select>
        </label>
        {/* can't use ColorDropdown since using someone else's hook */}
        <button style={{ backgroundColor: props.theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

// pull things out of redux, and hand it to component

// read data
const mapStateToProps = ({ theme, location }) => ({
  theme,
  location
});

// update; send actions to redux to tell it to update itself
const mapDispatchToProps = dispatch => ({
  setTheme: theme => dispatch(changeTheme(theme)),
  updateLocation: location => dispatch(changeLocation(location))
});

// connect returns a function that you'll invoke with SearchParams;
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchParams);
