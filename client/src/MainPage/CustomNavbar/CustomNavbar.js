import React, { useState } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LoginSignUpModal from '../Modal/LoginSignUpModal';

const CustomNavbar = (props) => {
  const [modalShow, setModalShow] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState("");

  function UserInfo() {
    if (userEmail !== "") {
      return (
        <Navbar.Brand>
          {userEmail}
        </Navbar.Brand>
      );
    }   

    return (
      <Navbar.Brand>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Login/SignUp
        </Button>
        <LoginSignUpModal 
          callbackuser={setUserEmail} 
          show={modalShow} 
          onHide={() => setModalShow(false)}
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
