import React, { useState } from "react";

const useDropdown = (label, defaultState, options) => {
  // label => "Animal"
  // defaultState => "dog"
  // options => ANIMALS
  const [state, setState] = useState(defaultState);
  // generic format of useState...not sure yet...
  const id = `use-dropdown-${label.replace(" ").toLowerCase()}`;
  // "Animal" ==> 'use-dropwdown-animal'
  const Dropdown = () => (
    <label htmlFor={id}>
      {label}
      <select
        id={id}
        value={state}
        onChange={e => setState(e.target.value)}
        onBlur={e => setState(e.target.value)}
        disabled={options.length === 0}
      >
        <option>All</option>
        {options.map(item => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );

  return [state, Dropdown, setState];
  // state for AnimalDropdown: currently selected animal
  // state for BreedDropdown: currently selected breed
  // why setState is an optional feed...
  // perhaps you want to change the state of a dropdown from outside of this component
  // i.e. changing the state of BreedDropdown upon state change of Animal Dropdown
};

export default useDropdown;

// when triggering useDropdown(label, defaultState, options)...
// it will return [state, Dropdown, setState]

// back in SearchParam land
// if we do
// const [animal, AnimalDropdown] = useDropdown("Animal", "dog", ANIMALS);
// it will assign animal to state
// it will assign AnimalDropdown to const Dropdown with closure invoked
