import { React, useState } from 'react';
import './Scramboard.css';
import Board from '../Board/Board';
import CustomNavbar from '../CustomNavbar/CustomNavbar';
import ColorPicker from '../ColorPicker/ColorPicker';
import ChatWindow from '../ChatWindow/ChatWindow';
import {  Button } from 'react-bootstrap';
import UserAvatar from 'react-user-avatar'
const Scramboard = (props) => {
  const [color, setColor] = useState("#ffffff");
  const [username, setUsername] = useState("Anon"); // null means no user logged in

  // Once a color change is complete, this function is called.
  // It sets the color state of Scramboard, which is then passed down
  // to the Board component, then the Pixel componenet. Every time
  // a pixel button is clicked, its color is changed to the color state
  // of the Scramboard class
  const handleColorChangeComplete = (color) => {
    setColor(color.hex);
  }

  
  return (
    <div>
      <CustomNavbar/>
      <div className="scram">
        <div className="scram-div">
          <ColorPicker onColorChangeComplete={handleColorChangeComplete} />
          <div className="scram-board">
            <Board currentColor={color} />
          </div>
        </div>
        <div className="right_sidebar">
          <div className="profile">
            <span  class="Avatar">
            <UserAvatar size="128" name={username} color={"rgb("+Math.random() * (255)+","+Math.random() * (255)+","+Math.random() * (255)+")"}/>
            </span>
        
            <p>Birthdate:</p>
            <p>Number of comments: </p>
            <Button variant="dark">Change Password</Button>{' '}
          </div>
          
        <ChatWindow/>
        </div>
      </div>
    </div>
  );
}

export default Scramboard;