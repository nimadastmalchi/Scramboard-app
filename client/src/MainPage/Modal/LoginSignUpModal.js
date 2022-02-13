import { Modal, Button, Tabs, Tab} from 'react-bootstrap';
import React from 'react';
function LoginSignUpModal(props) {
    return (
        <Modal
            {...props}
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
                        <form>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder="Enter email" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" />
                            </div>

                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                </div>
                            </div>

                            <Button style={{marginTop:'20px'}} type="submit" className="btn btn-dark btn-lg btn-block">Log in</Button>
                            <p className="forgot-password text-right">
                                Forgot <a href="#">password?</a>
                            </p>
                        </form>
                    </Tab>

                    <Tab eventKey="SignUp" title="SignUp">
                    <form>
                            <div className="form-group">
                                <label>Email</label>
                                <input type="email" className="form-control" placeholder="Enter email" />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password" />
                            </div>

                           

                            <Button style={{marginTop:'20px'}}type="submit" variant="primary" className="btn  btn-lg btn-block">SignUp</Button>
                        
                        </form>
                    </Tab>

                </Tabs>



            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal >
    );
}
export default LoginSignUpModal;