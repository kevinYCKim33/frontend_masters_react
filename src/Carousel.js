import React from "react";

class Carousel extends React.Component {
  // again thanks to some weird experimental babel package
  // no need for constructor or this.state = {}
  state = {
    photos: [], // an array of multiple photos of a given pet
    active: 0 //have the 1st photo be the default active photo
  };

  /*
  so the photos are gonna be passed in from parent to carousel
  but parent is gonna give a large object of various sizes of photos
  so let's weed out the ones we don't need
  Special React method: must be static
  take in a set of props and give you back a new set of state

  feels a lot like
  constructor(props) {
    super(props);
    this.state = {
      photos: props.media.map({large} => large)
    }
  }
  */
  static getDerivedStateFromProps({ media }) {
    let photos = ["http://placecorgi.com/600/600"]; // default image

    // if there are puppy photos
    // set the photos array to large pics of the dog only...
    if (media.length) {
      photos = media.map(({ large }) => large); // just get the large photos from sm, md, lg, full
      // photos will just an array of strings of urls
    }
    // pretty clean code...
    // basically using some parts of props to set the default state of the class component
    return { photos };
  }

  // the => is pretty necessary here
  // Brian's rule of thumb: whenever you are passing functions down to children, or event listeners
  // use arrow functions
  handleIndexClick = event => {
    this.setState({
      active: +event.target.dataset.index // "5" => +"5" // 5
    });
  };

  render() {
    const { photos, active } = this.state;

    return (
      <div className="carousel">
        <img src={photos[active]} alt="animal" />
        <div className="carousel-smaller">
          {photos.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              onClick={this.handleIndexClick}
              data-index={index}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
