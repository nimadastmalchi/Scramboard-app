import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { SketchPicker, SliderPicker } from 'react-color';

// dimensions of the board
const num_rows = 50;
const num_cols = 50;

function Pixel(props) {
  return (
    <button style={{backgroundColor: props.color,}} className="pixel" onClick={props.onClick}></button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pixels : Array.from(Array(num_rows), () => Array(num_cols).fill('#ffffff')),
    };
  }

  handleClick(i, j) {
    this.state.pixels[i][j] = this.props.currentColor;
    this.setState({});
  }

  renderPixel(i, j) {
    return (
      <Pixel
        onClick={() => this.handleClick(i,j)}
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
      background : "#fff",
    }
  }

  render() {
    return (
      <SketchPicker
        color={ this.state.background }
        onChangeComplete={ (color) => {
          this.state.background = color;
          this.setState({});
          this.props.onColorChangeComplete(color);
        }}
      />
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stepNumber : 0,
      color : '#ffffff',
    };
  }

  jumpTo(step) {
     this.setState({
       stepNumber : step,
     });
  }

  handleColorChangeComplete = (color) => {
    this.setState({
      color : color.hex,
    });
  }

  render() {
    let status = "Scramboard";

    return (
      <div className="game">
        <ColorPicker onColorChangeComplete={ this.handleColorChangeComplete }/>
        <div className="game-board">
          <Board currentColor={this.state.color}/>
        </div>
        <div className="game-info">
          <div>{status}</div>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);