import React from 'react';
import { Navbar, Container } from 'react-bootstrap'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const CustomNavbar = (props) => {
  return (
    <Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand href="#home">
        Scramboard 
      </Navbar.Brand>
      <Navbar.Brand href="#login">
        login
      </Navbar.Brand>
    </Container>
    </Navbar>
  );
}
export default CustomNavbar;

