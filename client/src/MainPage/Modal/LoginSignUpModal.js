import { Modal, Button, Tabs, Tab, Alert } from 'react-bootstrap';
import { React, useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseCongfig";

function LoginSignUpModal(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function onSignup() {
        // send data to node
        fetch('http://localhost:3001/newuser', {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        })
            .then(
                response => (response.json())
            )
            .then((result) => {
                if (result.message === "received") {
                    props.triggerAlert(true, "Success", "Welcome", "You have successfully signed up");
                    props.setuseremail(email);
                }
                else {
                    props.triggerAlert(true, "Failure", "Unsuccessful signed up attempt. Please try again later.", result.message)
                    //alert(result.message)
                    console.log(result.message);
                }
            })
            .catch((error) => console.log(error));
    }

    function onLogin() {
        signInWithEmailAndPassword(auth, email, password)
            .then((userRecord) => {
                console.log(userRecord.user.uid)
                props.setuseremail(email);
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
                    .then((res) => res.json())
                    .catch((error) => {console.log(error)});
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


                                <div className="form-group">
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                    </div>
                                </div>

                                <Button style={{ marginTop: '20px' }} type="submit" className="btn btn-dark btn-lg btn-block" onClick={onLogin}>Log in</Button>
                                <p className="forgot-password text-right">
                                    <a href="/">Forgot password?</a>
                                </p>
                            </form>
                        </Tab>

                        <Tab eventKey="SignUp" title="SignUp">
                            <form onSubmit={(event) => event.preventDefault()}>
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


/*


<<<<<<< HEAD
                            <Button style={{marginTop:'20px'}} type="submit" className="btn btn-dark btn-lg btn-block" onClick={onLogin}>Log in</Button>
                            <p className="forgot-password text-right">
                                <a href="/">Forgot password?</a>
                            </p>
                        </form>
                    </Tab>
=======

*/