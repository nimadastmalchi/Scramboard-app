import React from 'react'

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

    return (
        <li>{props.username}: {props.message}</li>
    );
}

export default Message