// server/index.js
const express = require("express");
const PORT = process.env.PORT || 3001;

const init = require('./init.js')

//firebase
var admin = require("firebase-admin");
var serviceAccount = require("./scramboard-firebase-adminsdk-netwc-80594fa323.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://scramboard-default-rtdb.firebaseio.com/"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = admin.database();
const pixelsRef = db.ref("pixels");

const app = express();

// initialize data in DB if needed
const NUM_ROWS = 50;
const NUM_COLS = 50;
init.validatePixels(pixelsRef, NUM_ROWS, NUM_COLS);

// Utils for reading JSON:
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

app.use(jsonParser);

const cors = require("cors");
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
    if (val === 0) {
      return;
    }
    return res.json(val);
  });
});

// Write to board
// Request must be of form:
// {
//    row: x,
//    col: y,
//    new_color: "#rrggbb"|"#rgb",
// }
app.post('/board', (req, res) => {
  res.send("received");
  db.ref('pixels/array/' + req.body.row + '/' + req.body.col + '/').set(req.body.new_color);
});


// ******** USER LOGIN/SIGNUP *********
// Write to users
// req.body must be of form:
// {
//     email: "xxx",
//     password: "yyy",
// }
app.post('/newuser', (req, res) => {
  var reponse = "received"
  admin.auth().createUser({
    email: req.body.email,
    password: req.body.password,
  })
    .then((userRecord) => {
      db.ref('users/' + userRecord.uid).set({
        email: req.body.email,
        password: req.body.password,
      });
    })
    .catch((error) => {
      console.log('Error creating new user:', error);
      reponse = error.message;
    }).then(() => {
      res.send({ message: reponse });
    })


});
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
