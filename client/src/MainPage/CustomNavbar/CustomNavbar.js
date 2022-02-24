import React, { useState } from 'react';
import { Navbar, Container, Button } from 'react-bootstrap'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import LoginSignUpModal from '../Modal/LoginSignUpModal';
import SignOutModal from '../Modal/SignOutModal';
import AlertMessage from '../Alert/AlertMessage';
const CustomNavbar = (props) => {

  const [loginSignUpShow, setLoginSignUpShow] = useState(false);
  const [signOutShow, setSignOutShow] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [showAlertType, setShowAlertType] = useState("");
  const [showAlertMessage, setShowAlertMessage] = useState("");
  const [showAlertMessageHeader, setShowAlertMessageHeader] = useState("");
  
  function alertHide(){
    setShowAlert(false);
  }

  function signOutUser() {
    setSignOutShow(false); // ensure signout is not shown next time
    props.setusername(null);
  }

  function UserInfo() {
    if (props.getusername() != null) {
      return (
        <Navbar.Brand>
          <Button variant="primary" onClick={() => setSignOutShow(true)}>
            {props.getusername()}
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
          triggerAlert={(condition, type, message, messageHeader) => {
            setLoginSignUpShow(false);
            setSignOutShow(false);
            setShowAlertType(type);
            setShowAlertMessage(message);
            setShowAlert(condition);
            setShowAlertMessageHeader(messageHeader);
          }}
          
          setusername={(username) => {
            props.setusername(username);
            setLoginSignUpShow(false); // ensure login is not shown next time
          }}

          show={loginSignUpShow}
          onHide={() => setLoginSignUpShow(false)}
        />
      </Navbar.Brand>

    );
  }
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            Scramboard
          </Navbar.Brand>
          <UserInfo />
        </Container>
      </Navbar>
      {showAlert ? <AlertMessage condition={showAlertType}  messageHeader={showAlertMessageHeader} message={showAlertMessage} showAlert={showAlert} hideAlert={alertHide} /> : null}
    </div>
  );
}
export default CustomNavbar;
