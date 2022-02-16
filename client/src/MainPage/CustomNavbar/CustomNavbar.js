import React, { useState } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LoginSignUpModal from '../Modal/LoginSignUpModal';
import SignOutModal from '../Modal/SignOutModal';

const CustomNavbar = (props) => {
  const [loginSignUpShow, setLoginSignUpShow] = useState(false);
  const [signOutShow, setSignOutShow] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  function signOutUser() {
    setSignOutShow(false); // ensure signout is not shown next time
    setUserEmail("");
  }

  function UserInfo() {
    if (userEmail !== "") {
      return (
        <Navbar.Brand>
          <Button variant="primary" onClick={() => setSignOutShow(true)}>
            {userEmail}
          </Button>
          <SignOutModal
            signoutuser={signOutUser}
            show={signOutShow}
            onHide={() => setSignOutShow(false)}
          />
        </Navbar.Brand>
      );
    }   

    return (
      <Navbar.Brand>
        <Button variant="primary" onClick={() => setLoginSignUpShow(true)}>
          Login/SignUp
        </Button>
        <LoginSignUpModal 
          setuseremail={(email) => {
            setUserEmail(email);
            setLoginSignUpShow(false); // ensure login is not shown next time
          }}
          show={loginSignUpShow} 
          onHide={() => setLoginSignUpShow(false)}
        />
      </Navbar.Brand>
    );
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          Scramboard
        </Navbar.Brand>
        <UserInfo/>
      </Container>
    </Navbar>
  );
}
export default CustomNavbar;
