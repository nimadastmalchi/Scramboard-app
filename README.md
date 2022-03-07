Type the below commands in both the client and server directories.

$ npm install

$ npm start

# Firebase database setup
1) Create a Firebase account with your email
2) Create a project
3) Click on the web button and register the app. This will provide with firebase SDK keys for web.
4) Add the key from this to the firebaseConfig.js file on the client side.
5) Go to project Settings, then service accounts. Create a new Firebase admin sdk key add this to server file.
6) Give permission for Authnetication, to allow user's to login with Email and password.
7) Create a Real Time database and set the security rules to allow read and write.
