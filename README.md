Type the below commands in both the client and server directories.

$ npm install

$ npm start

# Firebase database setup
1) Create a Firebase account with your email
2) Create a project
3) Click on the web button and register the app. This will provide with firebase SDK keys for web.
4) Add the key from this to the firebaseConfig.js file on the client side.
5) For importing Authnitcation to the client side you can use,
```Javscript
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseCongfig";
```
7) Go to project Settings, then service accounts Tab. Create a new Firebase admin sdk key and add this to server file.
8) Also add this to your server index file so Node.js can access Firebase.
```Javscript
var admin = require("firebase-admin");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "database URL"
});
```
9) Give permission for Authnetication, to allow user's to login with Email and password.
10) Create a Real Time database and set the security rules to allow read and write.
