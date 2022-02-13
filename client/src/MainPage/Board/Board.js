// Board.js
import Pixel from '../Pixel/Pixel';
import React, { useState } from 'react';

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      num_rows: 50,
      num_cols: 50,
      pixels: Array.from(Array(50), () => Array(50).fill('#ffffff')), // initially white
    };

    this.setBoardFromDB();
    //setInterval(() => this.setBoardFromDB(), 10000);
  }

  setBoardFromDB() {
    // get data from node
    fetch("http://localhost:3001/board/")
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          num_rows: data.num_rows,
          num_cols: data.num_cols,
          pixels: data.array,
        });
      });
  }

  handleClick(i, j) {
    this.state.pixels[i][j] = this.props.currentColor; // currentColor is passed down from Scramboard
    this.setState({});

    // send data to node
    fetch('http://localhost:3001/board', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        row: i,
        col: j,
        new_color: this.props.currentColor,
      })
    }).then((data) => data.json()).catch((error) => console.log(error));
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
    const rows = Array(this.state.num_rows).fill(null);
    for (let i = 0; i < this.state.num_rows; ++i) {
      const pixel_elements = Array(this.state.num_cols).fill(null);
      for (let j = 0; j < this.state.num_cols; ++j) {
        pixel_elements[j] = this.renderPixel(i, j);
      }
      rows[i] = <div key={i} className="board-row">{pixel_elements}</div>;
    }
    return (
      <div>{rows}</div>
    )
  }
}

/*
// Known issue: fetch is setBoardFromDB() does not work (???)
const Board = (props) => {
  const [numRows, setNumRows] = useState(50);
  const [numCols, setNumCols] = useState(50);
  const [pixels, setPixels] = useState(Array.from(Array(50), () => Array(50).fill('#ffffff')));

  const setBoardFromDB = () => {
    // get data from node
    fetch("http://localhost:3001/board/")
      .then((res) => {
          res.json();
          console.log(res);
      })
      .then((data) => {
        setNumRows(data.num_rows);
        setNumCols(data.num_cols);
        setPixels(data.array);
      });
  }

  setBoardFromDB();
  setInterval(() => setBoardFromDB(), 5000);

  const handleClick=(i, j)=> {
    pixels[i][j] = props.currentColor;
    setNumRows(numRows);
    // send data to node
    fetch('http://localhost:3001/board', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        row: i,
        col: j,
        new_color: props.currentColor,
      })
    }).then((data) => data.json()).catch((error) => console.log(error));
  }

  const renderPixel = (i, j) => {
    return (
      <Pixel
        onClick={() => handleClick(i, j)}
        color={pixels[i][j]}
      />
    );
  }

  const rows = Array(numRows).fill(null);
  for (let i = 0; i < numRows; ++i) {
    const pixelElements = Array(numCols).fill(null);
    for (let j = 0; j < numCols; ++j) {
      pixelElements[j] = renderPixel(i, j);
    }
    rows[i] = <div key={i} className="board-row">{pixelElements}</div>;
  }
  return (
    <div>{rows}</div>
  )
}
*/

export default Board;