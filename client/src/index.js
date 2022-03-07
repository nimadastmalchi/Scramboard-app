import React from 'react';
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import Heatmap from './Heatmap/Heatmap';
import Scramboard from './MainPage/Scramboard/Scramboard';
import CustomNavbar from './CustomNavbar/CustomNavbar';

const App = () => {
  //User profile information 
  const [username, setUsername] = useState(null); // null means no user logged in
  const [userBirthdate, setUserBirthdate] = useState("NAN"); 
  const [userNumberofpixelEdited, setUserNumberofpixelEdited] = useState(0);
  const [userNumberofComments, setUserNumberofComments] = useState(0);
  const [userID, setUserID] = useState(0);

  useEffect(() => {
    setUsername(window.localStorage.getItem('username'));
    setUserBirthdate(window.localStorage.getItem('userBirthdate'));
    setUserNumberofpixelEdited(parseInt(window.localStorage.getItem('userNumberofpixelEdited')));
    setUserNumberofComments(parseInt(window.localStorage.getItem('userNumberofComments')));
    setUserID(window.localStorage.getItem('userID'));
  }, []);

  useEffect(() => {
    window.localStorage.setItem('username', username);
    window.localStorage.setItem('userBirthdate', userBirthdate);
    window.localStorage.setItem('userNumberofpixelEdited', userNumberofpixelEdited);
    window.localStorage.setItem('userNumberofComments', userNumberofComments);
    window.localStorage.setItem('userID', userID);
  }, [username, userBirthdate, userNumberofpixelEdited, userNumberofComments, userID]);
  
  if (username === 'null') {
    setUsername(null);
  }
  return (
    <Router>
      <div>
        {/* A <Routes> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/" 
                element={
                  <div>
                    <CustomNavbar
                      setusername={setUsername}
                      setuserBirthdateScramboard={setUserBirthdate}
                      setUserNumPixelEditedScramboard={setUserNumberofpixelEdited}
                      setUsernumPixelEditedScramboard={setUserNumberofComments}
                      setUserIDScramboard={setUserID}
                      getusername={() => username}
                    />
                    <Scramboard
                      username={username}
                      setUsername={setUsername}
                      userBirthdate={userBirthdate}
                      setUserBirthdate={setUserBirthdate}
                      userNumberofpixelEdited={userNumberofpixelEdited}
                      setUserNumberofpixelEdited={setUserNumberofpixelEdited}
                      userNumberofComments={userNumberofComments}
                      setUserNumberofComments={setUserNumberofComments}
                      userID={userID}
                      setUserID={setUserID}
                    />
                  </div>
                }
          />
          <Route path="/heatmap" 
                 element={
                   <div>
                    <CustomNavbar
                      setusername={setUsername}
                      setuserBirthdateScramboard={setUserBirthdate}
                      setUserNumPixelEditedScramboard={setUserNumberofpixelEdited}
                      setUsernumPixelEditedScramboard={setUserNumberofComments}
                      setUserIDScramboard={setUserID}
                      getusername={() => username}
                    />
                    <Heatmap/>
                   </div>
                 }
          >
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);