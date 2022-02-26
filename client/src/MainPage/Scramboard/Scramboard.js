import { React, useState } from 'react';
import './Scramboard.css';
import Board from '../Board/Board';
import CustomNavbar from '../CustomNavbar/CustomNavbar';
import ColorPicker from '../ColorPicker/ColorPicker';
import ChatWindow from '../ChatWindow/ChatWindow';
import UserAvatar from 'react-user-avatar'
const Scramboard = (props) => {
  const [color, setColor] = useState("#ffffff");
  const [username, setUsername] = useState(null); // null means no user logged in

  // the clickNumber in the form
  const [clickNumber, setClickNumber] = useState('');

  // the clickNumber submitted
  const [submittedClickNumber, setSubmittedClickNumber] = useState('');

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
      <CustomNavbar 
        setusername={setUsername} 
        getusername={() => username}
      />
      <div className="scram">
        <div className="scram-div">

          <ColorPicker className="color_picker" onColorChangeComplete={handleColorChangeComplete} />

          <div className="snapshot_selector" >
            <label>
              Enter a click number to travel back to:
              <input type="text" onChange={(event) => setClickNumber(event.target.value)}/>
            </label>
            <button type="submit" value="Submit" onClick={() => {
              setSubmittedClickNumber(clickNumber)
              console.log(submittedClickNumber); 
            }
            }/>
          </div>

          <div className="scram-board">
            <Board currentColor={color} 
                    userLoggedIn={username != null}
                    clickNumber={submittedClickNumber}
            />
          </div>

        </div>

        <div className="right_sidebar">
          { username != null ?
            <div className="profile"> 
                <span  className="Avatar">
                  <UserAvatar 
                    size="128" 
                    name={username} 
                    color={"rgb("+Math.random() * (255)+","+Math.random() * (255)+","+Math.random() * (255)+")"}
                  />
                </span>
            
                <p>Birthdate: </p>
                <p>Number of comments: </p>
            </div>
          : 
            <div className="profile">
              <p>Welcome!</p>
            </div>
          }

          <ChatWindow username={username}/>

        </div>
      </div>
    </div>
  );
}

export default Scramboard;