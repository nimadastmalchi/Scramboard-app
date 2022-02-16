import React, { useState } from 'react';

const MessageInput = ({socket}) => {
  const [value, setValue] = useState('');

  //TODO: change to passed in prop when adding auth
  const username = "Anonymous";
  
  const submitForm = (e) => {
    e.preventDefault();
    const message = {
        username: username,
        message: value
    }
    console.log("emit message: " + message);
    socket.emit('message', message);
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
      />
    </form>
  );
};

export default MessageInput;