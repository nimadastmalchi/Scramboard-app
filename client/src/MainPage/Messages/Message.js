import React from 'react';
import stringRGBHash from '../../Utilities/hash';
import './Messages.css';

function Message(props) {

    /**
     * Represents a "message" in the chat history.
     * 
     * Returns a list element containing the user name and message passed into chat.
     * 
     * props should contain the following:
     *      props.username
     *      props.message
     */

    // Randomly generate a color for annonymous users

    /**
     * Randomly assign a color to the username associated with the chat message.
     * 
     * The minimum RGB value is 0 and the maximum RGB value is 255.
     */
    const MIN_RGB = 0;
    const MAX_RGB = 255;
    const R = Math.random() * (MAX_RGB - MIN_RGB) + MIN_RGB;
    const G = Math.random() * (MAX_RGB - MIN_RGB) + MIN_RGB;
    const B = Math.random() * (MAX_RGB - MIN_RGB) + MIN_RGB;

    let rgbString = null;
    if (props.username === "Anonymous") {
        // set to random values:
        rgbString = `rgb(${R}, ${G}, ${B})`;
    }
    else {
        rgbString = stringRGBHash(props.username);
    }

    return (
        <li className='chat_message'>
            <b style={{color: rgbString}}>
                {props.username}:
            </b> {props.message}
        </li>
    );
}

export default Message