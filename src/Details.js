import React from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";

// const Details = props => {
//   return (
//     <pre>
//       <code>{JSON.stringify(props, null, 4)}</code>
//     </pre>
//   );
// };

// hard requirement of class Component: must have a render()
// function Component == classless  functional component

// useState just WONT work with class Component
class Details extends React.Component {
  // Reactv5: Configuring Babel for Parcel
  // so much work just to get rid of constructor(props) and this.state
  state = { loading: true }; // this will land in 2019 in JS
  // constructor(props) {
  //   super(props);
  //   // odd ritual you have to do
  //   // call the constructor on my parent class which is a React.Component
  //   this.state = {
  //     loading: true
  //   };
  // }
  // useful for AJAX
  componentDidMount() {
    // throw new Error("lol");
    // props are immutable (read-only)
    pet.animal(this.props.id).then(({ animal }) => {
      // HAVE to do => here for this.setState to work...
      // function() {} would create a new context...
      // promise? window?? even Brian is not so sure himself...
      // => does not create a new context
      // basically doing let self = this;
      // hooks: another way to get rid of 'this' in JS
      // this.setState ~ a shallow merge ~ like Object.assign(oldState, newState)
      this.setState(
        {
          name: animal.name,
          animal: animal.type,
          location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
          description: animal.description,
          media: animal.photos,
          breed: animal.breeds.primary,
          loading: false
        },
        console.error
      );
    });
  }

  render() {
    if (this.state.loading) {
      return <h1>loading...</h1>;
    }

    const { animal, breed, location, description, name, media } = this.state;

    return (
      <div className="details">
        <Carousel media={media} />
        <div className="details">
          <div>
            <h1> {name} </h1>
            <h2> {`${animal} - ${breed} - ${location}`} </h2>
            <button> Adopt {name} </button>
            <p> {description} </p>
          </div>
        </div>
      </div>
    );
  }
}

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
      {/*spreads props across details  */}
    </ErrorBoundary>
  );
}
