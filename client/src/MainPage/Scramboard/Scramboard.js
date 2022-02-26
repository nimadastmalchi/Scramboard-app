import { React, useState } from 'react';
import './Scramboard.css';
import Board from '../Board/Board';
import CustomNavbar from '../CustomNavbar/CustomNavbar';
import ColorPicker from '../ColorPicker/ColorPicker';
import ChatWindow from '../ChatWindow/ChatWindow';
import UserAvatar from 'react-user-avatar';
import 'scrollable-component';

const Scramboard = (props) => {
  const [color, setColor] = useState("#ffffff");
  const [username, setUsername] = useState(null); // null means no user logged in
  const [numSnapshots, setNumSnapshots] = useState(0);

  // the clickNumber in the form
  const [clickNumber, setClickNumber] = useState('');

  // Fetch data from the node application, which accesses the DB for the
  // number of snapshots for the board.
  const setNumSnapshotsFromDB = () => {
    fetch("http://localhost:3001/numsnapshots/")
      .then((res) => res.json())
      .then((data) => {
        setNumSnapshots(data.numSnapshots);
      })
      .catch((error) => console.log(error));
  }

  setInterval(() => setNumSnapshotsFromDB(), 1000);

  // Once a color change is complete, this function is called.
  // It sets the color state of Scramboard, which is then passed down
  // to the Board component, then the Pixel componenet. Every time
  // a pixel button is clicked, its color is changed to the color state
  // of the Scramboard class
  const handleColorChangeComplete = (color) => {
    setColor(color.hex);
  }

  const getSnapshotButtons = () => {
    const listElements = Array(numSnapshots).fill(null);
    listElements[0] = <button key={0} 
                        className="snapshot_element"
                        onClick={() => {
                          setClickNumber('');
                        }}>
                          Live Board
                      </button>
    for (let i = 2; i <= numSnapshots; ++i) {
      listElements[i] = 
        <button key={i} 
                className="snapshot_element"
                onClick={() => {
                  setClickNumber(numSnapshots - i);
                }}>
                  Snapshot {numSnapshots - i}
        </button>
    }
    return listElements;
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


          <scrollable-component class="snapshot_list">
            {getSnapshotButtons()}
          </scrollable-component>

          <div className="scram-board">
            <Board currentColor={color} 
                    userLoggedIn={username != null}
                    clickNumber={clickNumber}
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