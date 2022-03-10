import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, onValue, ref } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDvp_9IsII7YT1cfdeqG3--zA1tFDDC17s",
  authDomain: "scramboard.firebaseapp.com",
  databaseURL: "https://scramboard-default-rtdb.firebaseio.com",
  projectId: "scramboard",
  storageBucket: "scramboard.appspot.com",
  messagingSenderId: "203592789675",
  appId: "1:203592789675:web:7f88b365dfe58c2f5591ee",
  measurementId: "G-MX5FLH2YWY"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);