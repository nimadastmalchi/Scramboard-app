class ChatConnection {
  constructor(chatRef, io, socket) {
    this.chatRef = chatRef;
    this.socket = socket;
    this.io = io;

    //This event will be used by new clients(connections) to retrieve all existing messages from the server.
    socket.on('getMessages', () => this.getMessages());

    //This event will be triggered by the client whenever a new message has been posted in the chat.
    socket.on('message', (payload) => this.handleMessage(payload));

    //Predefined events that are triggered when the socket(client) disconnects, for now it is a no-op 
    socket.on('disconnect', () => this.disconnect());
    
    //Predefined events that are triggered when the connection fails, for now it just log the error msg to console
    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }

  sendMessage(message) {
    this.io.sockets.emit('message', message);
  }
  
  getMessages() {
    this.chatRef.once("value").then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        const key = childSnapshot.key;
        var message = childSnapshot.val();
        message.id = key;
        this.sendMessage(message);
      });
    });
  }

  handleMessage(payload) {
    const time = Date.now();
    var message = {
      username: payload.username,
      message: payload.message,
      time: time
    };
    //write to db
    const key = this.chatRef.push(message).key;
    //append message id and send to client
    message.id = key;
    this.sendMessage(message);
  }

  disconnect() {
    console.log(`A chat connection terminated.`);
  }
}

module.exports = { ChatConnection }