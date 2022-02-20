import { Alert, Button } from 'react-bootstrap';
import { React, useState,useEffect } from 'react';

const AlertMessage = (props) => {
    const [show, setShow] = useState(true);
    if (props.condition === "Success") {
        return (
            <Alert show={true} variant="success">
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
            <Alert show={true} variant="danger">
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
        )
    }

}

export default AlertMessage;