// server/index.js
const express = require("express");
const PORT = process.env.PORT || 3001;

//firebase
var admin = require("firebase-admin");
var serviceAccount = require("./scramboard-firebase-adminsdk-netwc-80594fa323.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),

  databaseURL: "https://scramboard-default-rtdb.firebaseio.com/"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
var db = admin.database();
var ref = db.ref("hello/");

const app = express();

//reading json
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(jsonParser);
const cors = require("cors");
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions)) // Use this after the variable declaration
app.get("/api", (req, res) => {
  ref.once("value", function (snapshot) {
    console.log(snapshot.val());
    res.json({ message: "Hello from the server-firebase:" + snapshot.val() });
  });

});
app.post('/api', (req, res) => {
  let data = req.body;
  console.log(data.user.email)
  res.send("recieved ");
  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  db.ref('visited/' ).set({
    visit: time,
    name:data.user.email
  });
 
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});