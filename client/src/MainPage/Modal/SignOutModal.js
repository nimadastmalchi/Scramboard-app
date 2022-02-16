import { Modal, Button } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import { auth } from "../../firebaseCongfig";

function SignOutModal(props) {
  function onSignOut() {
    signOut(auth).then(() => {
      console.log('successful signout');
    }).catch((error) => {
      console.log('signout failed: ' + error);
    });
    props.signoutuser();
  }
  return (
    <Modal className='.signOutModal'
      show={props.show}
      onHide={props.onHide}
      size="sm"
    >
      <Modal.Body>
        <Button style={{ marginTop: '10px'}} type="submit" onClick={onSignOut}>Sign Out</Button>
      </Modal.Body>
    </Modal>
  );
}

export default SignOutModal;