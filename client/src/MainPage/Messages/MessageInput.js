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
};

export default MessageInput;