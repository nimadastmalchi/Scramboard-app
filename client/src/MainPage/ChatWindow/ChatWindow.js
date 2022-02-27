import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Messages from '../Messages/Messages';
import MessageInput from '../Messages/MessageInput';
import '../Messages/Messages.css'

const SERVER_PORT = 3001;

function ChatWindow(props) {
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const newSocket = io(`http://${window.location.hostname}:3001`);

        setSocket(newSocket);
        return () => newSocket.close();
    }, [setSocket]);

    // If socket is initialized, setup the chat window.
    // Else, put a placeholder error message saying chat is not connected.
    if (socket) {
        return (
            <div className='chat_window'>
                <Messages socket={socket} />
                <MessageInput socket={socket} username={props.username} userNumberofComments={props.userNumberofComments}
                    setUserNumberofCommentsChatWindow={(NumberofComments) => {
                        props.setUserNumberofCommentsScramboard(NumberofComments);
                    }}
                />

            </div>
        );
    } else {
        return (
            <div>Not Connected</div>
        );
    }
}

export default ChatWindow;