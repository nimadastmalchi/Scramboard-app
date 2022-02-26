import React, { useState } from 'react';

const MessageInput = (props) => {
  const [value, setValue] = useState('');

  const username = props.username == null ? "Anonymous" : props.username;

  const submitForm = (e) => {
    e.preventDefault();
    const message = {
      username: username,
      message: value
    }
    console.log("emit message: " + message);
    props.socket.emit('message', message);
    setValue('');
  };

  if (props.username !== null) {
    return (
      <form onSubmit={submitForm}>
        <input
          autoFocus
          value={value}
          placeholder="Type your message"
          onChange={(e) => {
            setValue(e.currentTarget.value);
          }}
          className='chat_input'
        />
      </form>
    );
  } else {
      return(<div></div>)
  }
};

export default MessageInput;