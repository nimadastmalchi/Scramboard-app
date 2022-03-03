import { Alert, Button } from 'react-bootstrap';
import { React, useState } from 'react';

const AlertMessage = (props) => {
    const [show, setShow] = useState(true);
    if (props.condition === "Success") {
        return (
            <Alert className={props.className} show={true} variant="success">
                <Alert.Heading>{props.messageHeader}</Alert.Heading>
                <p>
                   {props.message}
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => props.hideAlert()} variant="outline-success">
                        Close
                    </Button>
                </div>
            </Alert>
        )
    }
    else   {
        //(props.condition === "Failure")
        return (
            <div>
                <Alert className={props.className} show={true} variant="danger">
                <Alert.Heading>{props.messageHeader}</Alert.Heading>
                <p>
                {props.message}
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                    <Button onClick={() => props.hideAlert()} variant="outline-danger">
                        Close
                    </Button>
                </div>
                </Alert>
            </div>
        )
    }

}

export default AlertMessage;