import React from 'react';
import './Pixel.css';

const Pixel = (props) => {
  return (
    <button style={{ backgroundColor: props.color, }} className="pixel" onClick={props.onClick}></button>
  );
}

export default Pixel;