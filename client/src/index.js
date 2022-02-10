import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import { SketchPicker } from 'react-color';
import { Nav, Navbar, Container } from 'react-bootstrap'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import logo from './componenets/logo192.png';
// dimensions of the board
const num_rows = 50;
const num_cols = 50;

function Pixel(props) {
  return (
    <button style={{ backgroundColor: props.color, }} className="pixel" onClick={props.onClick}></button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pixels: Array.from(Array(num_rows), () => Array(num_cols).fill('#ffffff')), // initially white
    };
  }

  handleClick(i, j) {
    this.state.pixels[i][j] = this.props.currentColor; // currentColor is passed down from Scramboard
    this.setState({}); // re-render
  }

  renderPixel(i, j) {
    return (
      <Pixel
        onClick={() => this.handleClick(i, j)}
        color={this.state.pixels[i][j]}
      />
    );
  }

  render() {
    const rows = Array(num_rows).fill(null);
    for (let i = 0; i < num_rows; ++i) {
      const pixel_elements = Array(num_cols).fill(null);
      for (let j = 0; j < num_cols; ++j) {
        pixel_elements[j] = this.renderPixel(i, j);
      }
      rows[i] = <div key={i} className="board-row">{pixel_elements}</div>;
    }
    return (
      <div>{rows}</div>
    )
  }
}

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      background: "#fff",
    }
  }

  render() {
    return (
      <SketchPicker
        color={this.state.background}
        onChangeComplete={(color) => {
          this.setState({
            background: color,
          });
          this.props.onColorChangeComplete(color); // this function is passed down from Scramboard
        }}
      />
    );
  }
}

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
    let status = "Scramboard";

    function App() {
      const [data, setData] = React.useState(null);

      React.useEffect(() => {
        fetch("http://localhost:3001/api/")
          .then((res) => res.json())
          .then((data) => setData(data.message));
      }, []);

      return (
        <div className="App">
          <header className="App-header">
            <p>{!data ? "Connecting to the server..." : data}</p>
          </header>
        </div>
      );
    }
    function handleSubmit()
    {
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
      }).then((data) => data.json()).catch((error) => console.log(error))
    };


    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">
              <img
                alt=""
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              React Bootstrap
            </Navbar.Brand>
          </Container>
        </Navbar>
        <div className="game">
          <div className="game-div">
            <ColorPicker onColorChangeComplete={this.handleColorChangeComplete} />
            <div className="game-board">
              <Board currentColor={this.state.color} />
            </div>
            <div className="game-info">
              <div>{status}</div>
            </div>
          </div>
          <App />
          <div className="profile">
            <p>player's information</p>
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

// ========================================

ReactDOM.render(
  <Scramboard />,
  document.getElementById('root')
);
