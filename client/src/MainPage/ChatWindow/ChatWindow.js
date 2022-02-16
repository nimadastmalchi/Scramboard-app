import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const SERVER_PORT = 3001;

function ChatWindow() {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io('http://localhost:' + SERVER_PORT);
        setSocket(newSocket);
        return () => newSocket.close();
      }, [setSocket]);

    return (
        <div className="ChatWindow">
            { socket ? (
            <div className="chat-container">
                <Messages socket={socket} />
                <MessageInput socket={socket} />
            </div>
            ) : (
            <div>Not Connected</div>
            )}
        </div>
    );
}

export default ChatWindow;