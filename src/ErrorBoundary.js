// mostly code from the docs reactjs.org/docs/error-boundaries.html

import React, { Component } from "react";
import { Redirect, Link } from "@reach/router";

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };
  // HAS to be called getDerivedStateFromError to be activated
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }

  // any time it gets new state or props...it will run
  // like useEffect in hooks
  componentDidUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing.
          <Link to="/">
            Click here to go back to the home page or wait five seconds.
          </Link>
        </h1>
      );
    }
    // if things are normal...return all its children
    return this.props.children;
  }
}

export default ErrorBoundary;
