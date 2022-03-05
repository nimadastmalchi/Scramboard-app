import React from 'react';
import { SketchPicker } from 'react-color';
import './ColorPicker.css'

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
        width='250px'
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

export default ColorPicker;