# Scramboard

Scramboard is a collective pixel-board that can be edited in real-time by users logged into the site. Users can edit individual pixels on a whim, but under coordinated efforts can create creative pixel art images. However, they must be cautious as other users rise to make their own mark.



# Installation Requirements

- git: [https://git-scm.com/](https://git-scm.com/)

- Node.js: [https://nodejs.org/en/](https://nodejs.org/en/)

# Local Setup

1. Clone the git repository to a directory of your choice:
   
   ```bash
   git clone https://github.com/nimadastmalchi/Scramboard.git
   ```

2. Open two terminals, as one will be running the **client** and the other running the **server.**
   
   - For the **client** terminal, do
     
     ```bash
     cd ./Scramboard/client
     ```
   
   - For the **server** terminal, do
     
     ```bash
     cd ./Scramboard/server
     ```
   
   We switched the current working directory of the client and server terminals to where the client and server source code will be.

3. **In both terminals,** run `npm install`

4. Scramboard uses Google Firebase as its database service; specifically the **"Realtime Database"** service. The repo has a default "example" database setup that can be used to try out the app.
   
   - **If you want to use your own Firebase database instance,** follow the Firebase database setup and configuration instructions below.

5. **In both terminals,** run `npm start` to start the client and server software.
   
   - **Client** app will be running on `http://localhost:3000`
   
   - **Server** app will be running on `http://localhost:3001`

# Firebase database setup and configuration

1) Create a Firebase account with your email account.

2) Create a project.

3) Click on the web button and register the app. This will provide with firebase SDK keys for web.

4) Add the key given in Step 3 to `./Scramboard/client/src/firebaseCongfig.js`

5) For importing Authentication to the client side you can use,
   
   ```Javascript
   import { signInWithEmailAndPassword } from "firebase/auth";
   import { auth } from "../../firebaseCongfig";
   ```

6) Go to project Settings, then service accounts Tab. Create a new Firebase admin sdk key and add this to server file.

7) Add the following to `./Scramboard/server/index.js` so Node.js can access the Firebase database.
   
   ```javascript
   var admin = require("firebase-admin");
   
   var serviceAccount = require("path/to/serviceAccountKey.json");
   
   admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "database URL"
   });
   ```

```
9) Give permission for Authnetication, to allow user's to login with Email and password.
10) Create a Real Time database and set the security rules to allow read and write.
```
