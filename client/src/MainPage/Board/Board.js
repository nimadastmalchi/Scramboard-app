// Board.js
import Pixel from '../Pixel/Pixel';
import React from 'react';
import AlertMessage from '../Alert/AlertMessage'

class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      numRows: 50,
      numCols: 50,
      pixels: Array.from(Array(50), () => Array(50).fill('#ffffff')), // initially white
      showAlert: false,
    };

    this.setBoardFromDB();
    setInterval(() => this.setBoardFromDB(), 5000);
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
    if (!this.props.userLoggedIn) {
      this.setState({showAlert:true});
      return; // ignore click
    }

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
    }).then((data) => data.json()).catch((error) => console.log("Error: " + error));
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
    const rows = Array(this.state.numRows).fill(null);
    for (let i = 0; i < this.state.numRows; ++i) {
      const pixelElements = Array(this.state.numCols).fill(null);
      for (let j = 0; j < this.state.numCols; ++j) {
        pixelElements[j] = this.renderPixel(i, j);
      }
      rows[i] = <div key={i} className="board-row">{pixelElements}</div>;
    }

    let alertMessage = 'Please Log-in to Edit the Board'

    return (
      <div>
        {this.state.showAlert ? 
              <AlertMessage condition={"Failure"} 
                            message={alertMessage}
                            showAlert={true} 
                            hideAlert={() => this.setState({showAlert:false})} 
              /> : rows
        }
      </div>
    );
  }
}

export default Board;