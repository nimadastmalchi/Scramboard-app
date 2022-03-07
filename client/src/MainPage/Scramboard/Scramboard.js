import { React, useState, useEffect } from 'react';
import './Scramboard.css';
import Board from '../Board/Board';
import ColorPicker from '../ColorPicker/ColorPicker';
import ChatWindow from '../ChatWindow/ChatWindow';
import UserAvatar from 'react-user-avatar';
import Footer from '../Footer/footer';
import stringRGBHash from '../../Utilities/hash';
import { Button  } from 'react-bootstrap';
import 'scrollable-component';

const Scramboard = (props) => {
  const [color, setColor] = useState("#ffffff");
  const [numSnapshots, setNumSnapshots] = useState(0);
  const [avatarColor, setAvatarColor] = useState("rgb(0, 0, 0)");

  // the clickNumber in the form
  const [clickNumber, setClickNumber] = useState('');
  const [clickedButtonIndex, setClickedButtomIndex] = useState(0); // initailly, the Live Board is clicked

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

  const setProfileFromDB = () => {
    fetch('http://localhost:3001/userprofileupdate', {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userNumberofpixelEdited: props.userNumberofpixelEdited,
        userNumberofComments: props.userNumberofComments,
        id: props.userID
      })
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
  }

  //setInterval(() => setNumSnapshotsFromDB(), 1000);

  useEffect(() => {
    setNumSnapshotsFromDB();
    setProfileFromDB();
    if (props.username != null) {
      setAvatarColor(stringRGBHash(props.username));
    }
  }, [props.userNumberofpixelEdited, props.userNumberofComments, numSnapshots, props.username]);

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
    listElements[0] = 
      <Button key={0}
        variant={(0 === clickedButtonIndex ? 'outline-primary' : 'outline-secondary')}
        className="snapshot-element"
        onClick={() => {
          setClickedButtomIndex(0);
          setClickNumber('');
        }}
      >
        Live Board
      </Button>
    for (let i = 1; i <= numSnapshots - 1; ++i) {
      listElements[i] =
        <Button key={i}
          variant={(i === clickedButtonIndex ? 'outline-primary' : 'outline-secondary')}
          className="snapshot-element"
          onClick={() => {
            setClickedButtomIndex(i);
            setClickNumber(numSnapshots - i - 1);
          }}
          >
          Snapshot {numSnapshots - i}
        </Button>
    }
    return listElements;
  }

  return (
    <div>
      <div className="scram">

        <div className="left-sidebar">
          <ColorPicker className="color-picker" onColorChangeComplete={handleColorChangeComplete} />

          <scrollable-component class="snapshot-list">
            {getSnapshotButtons()}
          </scrollable-component>
        </div>

       
            <Board currentColor={color}
              userLoggedIn={props.username != null}
              clickNumber={clickNumber}
              userChangedPixel={props.setUserNumberofpixelEdited}
              userClickNum={props.userNumberofpixelEdited}
              classNam="board-shadow"
            />
     
        <div className="right-sidebar">
          {props.username != null ?
            <div className="profile">
              <span className="Avatar">
                <UserAvatar
                  size="100"
                  name={props.username.toUpperCase().substring(0, 2)}
                  color={avatarColor}
                />
              </span>
              <div className='profile-info'>
                <h6>Birthdate: {props.userBirthdate} </h6>
                <h6>Number of Comments: {props.userNumberofComments} </h6>
                <h6>Number of Pixels Changed: {props.userNumberofpixelEdited} </h6>
              </div>
            </div>
            :
            <div className="profile">
              <h6>Welcome!</h6>
            </div>
          }
          <ChatWindow username={props.username} userNumberofComments={props.userNumberofComments}   setUserNumberofCommentsScramboard={props.setUserNumberofComments} />

        </div>

      </div>
      <Footer />
    </div>
  );
}

export default Scramboard;