import { Modal, Button, Tabs, Tab } from 'react-bootstrap';
import { React, useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseCongfig";

function LoginSignUpModal(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    function onSignup() {
        // send data to node
        fetch('http://localhost:3001/newuser', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
                username: username
            })
        })
            .then(
                response => (response.json())
            )
            .then((result) => {
                if (result.message === "received") {
                    props.triggerAlert(true, "Success", "Welcome", "You have successfully signed up");
                    props.setusername(username);
                    props.setuserBirthdate(result.birthdate);
                    props.setUserNumPixelEdited(result.numPixelEdited);
                    props.setUsernumPixelEdited(result.numComments);
                    props.setUserID(result.id)
                }
                else {
                    props.triggerAlert(true, "Failure", "Unsuccessful signed up attempt. Please try again later.", result.message)
                }
            })
            .catch((error) => console.log(error));
    }

    function onLogin() {
        signInWithEmailAndPassword(auth, email, password)
            .then((userRecord) => {
                props.setusername(auth.currentUser.displayName);
                props.triggerAlert(true, "Success", "Begin your editing journay", "You have successfully logged in")

                fetch('http://localhost:3001/userlogin', {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: email,
                        password: password,
                        id: userRecord.user.uid
                    })
                })
                    .then(
                        response => (response.json())
                    )
                    .then((result) => {
                        props.setuserBirthdate(result.birthdate);
                        props.setUserNumPixelEdited(result.numPixelEdited);
                        props.setUsernumPixelEdited(result.numComments);
                        props.setUserID(result.id)
                    })
                    .catch((error) => { console.log(error) });
            }).catch((error) => {
                console.log(error);
                props.triggerAlert(true, "Failure", "Unsuccessful login attempt", "Wrong email or password");
                // alert(error.message);
            })
    }

    return (
        <div>
            <Modal
                show={props.show}
                onHide={props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <Tabs
                        className="flex-row mb-3"
                        style={{ display: 'flex', flexWrap: 'wrap' }}
                        defaultActiveKey="Login"
                        transition={false}
                        fill
                        justify
                    >
                        <Tab eventKey="Login" title="Login">
                            <form onSubmit={(event) => event.preventDefault()}>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" placeholder="Enter password" value={password} onChange={(event) => setPassword(event.target.value)} />
                                </div>
                                <Button style={{ marginTop: '20px' }} type="submit" className="btn btn-dark btn-lg btn-block" onClick={onLogin}>Log in</Button>
                            </form>
                        </Tab>

                        <Tab eventKey="SignUp" title="SignUp">
                            <form onSubmit={(event) => event.preventDefault()}>

                                <div className="form-group">
                                    <label>Username</label>
                                    <input className="form-control" placeholder="Enter Username" onChange={(event) => setUsername(event.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Email</label>
                                    <input type="email" className="form-control" placeholder="Enter email" onChange={(event) => setEmail(event.target.value)} />
                                </div>

                                <div className="form-group">
                                    <label>Password</label>
                                    <input type="password" className="form-control" placeholder="Enter password" onChange={(event) => setPassword(event.target.value)} />
                                </div>



                                <Button style={{ marginTop: '20px' }} type="submit" variant="primary" className="btn  btn-lg btn-block" onClick={onSignup}>SignUp</Button>

                            </form>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>

            </Modal >
        </div>
    );
}
export default LoginSignUpModal;