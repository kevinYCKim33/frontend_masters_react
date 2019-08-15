import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

// useRef: have this element that i'm gonna create...and always have it refer to the same element
// pop off modal, it needs to be destroyed...
// https://reactjs.org/docs/hooks-reference.html#useref
const Modal = ({ children }) => {
  // childr en: all the divs inside <Modal> </Modal>
  const elRef = useRef(null);
  // elRef // {current: null}
  if (!elRef.current) {
    // enters here the first time if useRef is null
    // just create a div...don't put it anywhere yet...
    const div = document.createElement("div");
    // just store it in this place
    elRef.current = div;
    //elRef // {current: div}
  }

  // 2. acknowledges this...
  useEffect(() => {
    // kicks in when <Modal> </Modal> mounts to the ReactDOM
    // happens when showModal flag is toggled on
    // closure going on here...
    // we have access to elRef
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    // this return is a bit funky though...
    // useEffect's special feature
    // if you return a function...
    // it will execute it when it Unmounts
    // so only runs when the modal closes
    // in ReactSpeak, when <Modal> </Modal> unmounts...
    return () => {
      modalRoot.removeChild(elRef.current);
    };
  }, []); // it needs to run only once! has no dependecies...

  // 3. but then goes straight here...
  // https://reactjs.org/docs/portals.html
  // ReactDOM.createPortal(child, container)
  return createPortal(<div>{children}</div>, elRef.current);
  // in this div that has yet to be placed in the DOM...put in these children from <Modal>{childrenDivs}</Modal>
  // through some "Portal", you put these div elements that belong in the App universe, in Modal component that could technically be put anywhere!
};

export default Modal;
