import React from 'react'
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

    // Randomly generate a color for the username (like twitch chat)

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

    return (
        <li className='chat_message'>
            <b style={{color: `rgb(${R}, ${G}, ${B})`}}>{props.username}:</b> {props.message}
        </li>
    );
}

export default Message