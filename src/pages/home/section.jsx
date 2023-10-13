// Importing the necessary module (React) from 'react'
import React from 'react';

// Defining a functional component named 'section' which takes 'props' as an argument
const section = (props) => {
  // Returning a JSX element with the provided 'id' and 'children' passed down as props
  return <section id={props.id}>{props.children}</section>;
};

// Exporting the 'section' component as the default export of this module
export default section;
