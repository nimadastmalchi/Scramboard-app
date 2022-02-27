// server/index.js
const express = require("express");
const http = require('http');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const init = require('./init.js');
const chat = require('./ChatConnection.js');

//firebase
var admin = require("firebase-admin");


var serviceAccount = require("./scramboard-firebase-adminsdk-netwc-80594fa323.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://scramboard-default-rtdb.firebaseio.com/"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = admin.database();
//user id
const pixelsRef = db.ref("pixels");
const historyRef = db.ref("history");
const chatRef = db.ref("chat");

const app = express();

// initialize data in DB if needed
const NUM_ROWS = 50;
const NUM_COLS = 50;
init.validatePixels(pixelsRef, NUM_ROWS, NUM_COLS);
init.validateHistory(historyRef);

// Utils for reading JSON:
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

app.use(jsonParser);

const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions)) // Use this after the variable declaration

// ********** PIXELS ************
// Read from board and send to react
app.get('/board', (req, res) => {
  pixelsRef.get().then((data) => {
    val = data.val();
    return res.json(val);
  });
});

// Get the number of snapshots from firebase
app.get('/numsnapshots', (req, res) => {
  historyRef.get().then((snapshot) => {
    const historyVal = snapshot.val();
    assert(historyVal != null);
    const numClicks = historyVal.currentSize;
    assert(numClicks != null);
    res.json({ numSnapshots: numClicks });
  });
});

// Read from db and return a specific snapshot of the board
// req must be of form:
// req = {
//     clickNumber : [INTEGER]
// }
// This API returns the state of the board after the board
// was clicked for the clickNumber(th) time.
// E.g., if clickNumber = 5, return the state of the
// board after the board was clicked for the 5th time.
app.post('/snapshot', (req, res) => {
  const clickNumber = req.body.clickNumber;
  if (clickNumber == null) {
    res.json({
      array: null
    });
  }
  else {
    historyRef.get().then((snapshot) => {
      const currentSize = snapshot.val().currentSize;
      if (clickNumber >= currentSize) {
        res.json({
          array: null
        });
      }
      else {
        const clicks = snapshot.val().clicks;
        if (clicks == null) {
          console.log('invalid history snapshot (clicks) after initialization');
          process.exit(1);
        }

        // construct the board snapshot:
        const newBoard = Array.from(Array(NUM_ROWS), () => Array(NUM_COLS).fill('#ffffff'));
        for (let i = 0; i <= clickNumber; ++i) {
          const point = clicks[i][0];
          const xy = point.split(',');
          x = parseInt(xy[0]);
          y = parseInt(xy[1]);
          const color = clicks[i][1];
          newBoard[x][y] = color;
        }
        res.json({
          array: newBoard
        })
      }
    })
  }
});

// Write to board
// Request must be of form:
// {
//    row: x,
//    col: y,
//    new_color: "#rrggbb"|"#rgb",
// }
app.post('/board', (req, res) => {
  res.json("received");
  db.ref('pixels/array/' + req.body.row + '/' + req.body.col + '/').set(req.body.new_color);
  historyRef.get().then((snapshot) => {
    const currentSize = snapshot.val().currentSize;
    if (currentSize == null) {
      console.log('Invalid history snapshot after initialization');
      process.exit(1);
    }
    db.ref('history/clicks/' + currentSize).set(
      [req.body.row + ',' + req.body.col, req.body.new_color]
    );
    db.ref('history/currentSize').set(currentSize + 1);
  });
});

// ******** USER LOGIN/SIGNUP *********
// Write to users
// req.body must be of form:
// {
//     email: "xxx",
//     password: "yyy",
// }
app.post('/newuser', (req, res) => {
  let reponse = "received";
  let birthdate = "";
  let id="";
  admin.auth().createUser({
    email: req.body.email,
    password: req.body.password,
    displayName: req.body.username
  })
    .then((userRecord) => {
      db.ref('users/' + userRecord.uid).set({
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        numberofpixelEdited: 0,
        numberofComments: 0,
      });
      birthdate = new Date(userRecord.metadata.creationTime).toDateString();
      id=userRecord.uid;
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
      reponse = error.message;
    }).then(() => {
      res.send({ message: reponse, numPixelEdited: 0, numComments: 0, birthdate: birthdate, id: id });
    })
});

// Read from users
// req.body must be of form:
// {
//   email: "xxx", 
//   password: "yyy",
// }
app.post('/userlogin', (req, res) => {

  //user Profile Information
  var birthdate = "";
  var numPixelEdited = 0;
  var numComments = 0;

  const userRef = db.ref('users/' + req.body.id);
  //reading user's information Firebase
  userRef.get().then((snapshot) => {
    const userInfo = snapshot.val();
    numPixelEdited = userInfo.numberofpixelEdited;
    numComments = userInfo.numberofComments;
    console.log(userInfo);
    console.log(userInfo.numberofComments);
  }).then(() => {
    admin.auth().getUser(req.body.id)
      .then(function (userRecord) {
        console.log("Creation time:", userRecord.metadata.creationTime);
        birthdate = new Date(userRecord.metadata.creationTime).toDateString();

        res.send({ numPixelEdited: numPixelEdited, numComments: numComments, birthdate: birthdate, id: req.body.id });
      })
  })
  //  res.json("recieved");
});

// ********** UserProfileUpdate ************
app.post('/userprofileupdate', (req, res) => {
  db.ref('users/' + req.body.id).update({
    numberofpixelEdited: req.body.userNumberofpixelEdited,
    numberofComments: req.body.userNumberofComments,
  });

  res.send({ message: "update profile" });
})

function initChat(io) {
  io.on('connection', (socket) => {
    new chat.ChatConnection(chatRef, io, socket);
  });
};

const server = http.createServer(app);
const { Server } = require('socket.io');
const { assert } = require("console");
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});
initChat(io);

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
