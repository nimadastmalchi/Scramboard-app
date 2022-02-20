import React, { useEffect, useState } from 'react';
import Message from './Message'

function Messages({ socket }) {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const messageListener = (message) => {
      console.log("received msg: " + message);
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        newMessages[message.id] = message;
        return newMessages;
      });
    };

    socket.on('message', messageListener);
    socket.emit('getMessages');

    return () => {
      socket.off('message', messageListener);
    };
  }, [socket]);

  return (
    <ul className="chat_messages">
      {[...Object.values(messages)]
        .sort((a, b) => a.time - b.time)
        .map((message) => (
          <div
            key={message.id}
            className="message-container"
            title={`Sent at ${new Date(message.time).toLocaleTimeString()}`}
          >

            {/* Maps every message recieved from backend into a Message component wrapped in*/}
            {/* extra <div>*/}
            <Message username={message.username} message={message.message} />
          </div>
        ))
      }
    </ul>
  );
}

export default Messages;