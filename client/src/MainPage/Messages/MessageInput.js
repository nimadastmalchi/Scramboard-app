import React, { useState } from 'react';
import InputEmoji from 'react-input-emoji'; // Source: https://www.npmjs.com/package/react-input-emoji
import "./Messages.css";

const MessageInput = (props) => {

  // "value" contains the message we want to send, and "setValue", essentially, sets the message
  // text to "value"
  const [value, setValue] = useState('');

  // If username is null, use "Anon" placeholder.
  const username = props.username == null ? "Anonymous" : props.username;

  // Arrow function responsible for submitting the message given in input.
  const submitForm = (e) => {

    // Commented out because <InputEmoji/> component does not
    // have a function called preventDefault();
    // e.preventDefault();

    // Format our message payload with the username and message given.
    const message = {
      username: username,
      message: value
    }

    // Print to console the message payload and then use Socket.io to send it off.
    console.log("emit message: " + message);
    props.socket.emit('message', message);

    // Reset the input message "value" back to blank text.
    setValue('');
  };

  // If username is not null, the user is logged in and can use chat.
  // Else, replace the chat entry with a message saying to log-in to chat.
  if (props.username !== null) {
    return (
      
      // Setup <InputEmoji> component for chat
      // Documentation: https://www.npmjs.com/package/react-input-emoji
      <div>
        <InputEmoji
          value={value}
          onChange={setValue}
          cleanOnEnter
          onEnter={submitForm}    // InputEmoji will call submitForm(); InputEmoji doesn't connect
                                  // with <form>'s "onSubmit" attribute
          placeholder="Type a message"
        />
      </div>

    );
  } else {
    return (
      <div style={{
        textAlign: "center",
        margin: "auto",
        padding: "15px",
      }}>
        <strong>Please log-in to chat</strong>
      </div>
    );
  }
};

export default MessageInput;