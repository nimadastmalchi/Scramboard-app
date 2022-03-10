import { React, useState, useEffect } from 'react';
import './Snapshots.css';
import 'scrollable-component';
import { getDatabase, onValue, ref } from 'firebase/database';

const SnapshotsList = (props) => {
  const [numSnapshots, setNumSnapshots] = useState(0);
  const [clickedButtonIndex, setClickedButtomIndex] = useState(0); // initailly, the Live Board is clicked

  // Fetch data from the node application, which accesses the DB for the
  // number of snapshots for the board.

  const numSnapshotsFromDBListener = () => {
    const db = getDatabase();
    const numSnapshotsRef = ref(db, 'history/currentSize');
    onValue(numSnapshotsRef, (snapshot) => {
      setNumSnapshots(snapshot.val());
    });
  }

  // Call once:
  useEffect(() => {
    numSnapshotsFromDBListener();
  }, []);

  const getSnapshotButtons = () => {
    const listElements = Array(numSnapshots).fill(null);
    listElements[0] = 
      <button key={0}
        className="snapshot-element"
        onClick={() => {
          setClickedButtomIndex(0);
          props.setClickNumber('');
        }}
        style={{backgroundColor: (0 === clickedButtonIndex ? '#008080' : 'white')}}
      >
        Live Board
      </button>
    for (let i = 1; i <= numSnapshots - 1; ++i) {
      listElements[i] =
        <button key={i}
          className="snapshot-element"
          onClick={() => {
            setClickedButtomIndex(i);
            props.setClickNumber(numSnapshots - i - 1);
          }}
          style={{backgroundColor: (i === clickedButtonIndex ? '#008080' : 'white')}}
          >
          Snapshot {numSnapshots - i}
        </button>
    }
    return listElements;
  }

  return (
    <scrollable-component class="snapshot-list">
      {getSnapshotButtons()}
    </scrollable-component>
  )
}

export default SnapshotsList;