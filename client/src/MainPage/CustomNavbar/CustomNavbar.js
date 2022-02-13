import React, { useState } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LoginSignUpModal from '../Modal/LoginSignUpModal';
const CustomNavbar = (props) => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">
          Scramboard
        </Navbar.Brand>
        <Navbar.Brand href="#login">
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Login/SignUp
          </Button>
          <LoginSignUpModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
}
export default CustomNavbar;
