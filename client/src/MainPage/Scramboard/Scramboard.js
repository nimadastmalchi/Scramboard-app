import React, { useEffect, useState } from 'react';
import './Scramboard.css';
import Board from '../Board/Board';
import CustomNavbar from '../CustomNavbar/CustomNavbar'
import ColorPicker from '../ColorPicker/ColorPicker'

class Scramboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#ffffff',
    };
  }

  // Once a color change is complete, this function is called.
  // It sets the color prop of Scramboard, which is then passed down
  // to the Board component, then the Pixel componenet. Every time
  // a pixel button is clicked, its color is changed to this.state.color.
  handleColorChangeComplete = (color) => {
    this.setState({
      color: color.hex,
    });
  }

  render() {
    function handleSubmit() {
      fetch('http://localhost:3001/api', {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "user": {
            "email": "a",
            "password": "b"
          }
        }),
      }).then((data) => data.json()).catch((error) => console.log(error));
    };

    return (
      <div>
        <CustomNavbar/>
        <div className="scram">
          <div className="scram-div">
            <ColorPicker onColorChangeComplete={this.handleColorChangeComplete} />
            <div className="scram-board">
              <Board currentColor={this.state.color} />
            </div>
          </div>
          <div className="profile">
            <p>History</p>
            <button
              onClick={handleSubmit}>
              submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Scramboard;