import React, { useEffect, useState } from 'react';
import Message from './Message';
import './Messages.css';

function Messages({ socket }) {
  const [messages, setMessages] = useState({});

  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => {
        const newMessages = { ...prevMessages };
        newMessages[message.id] = message;
        return newMessages;
      });


      // Whenever a new message is added, scroll to the
      // bottom of the chat message history.
      let chatMessageHistory = document.getElementById("chatMessageHistory");
      chatMessageHistory.scrollTo(0, chatMessageHistory.scrollHeight);
    };

    socket.on('message', messageListener);
    socket.emit('getMessages');

    return () => {
      socket.off('message', messageListener);
    };
  }, [socket]);

  return (
    <ul id="chatMessageHistory" className="chat_messages">
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