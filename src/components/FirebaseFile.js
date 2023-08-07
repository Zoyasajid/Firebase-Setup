// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore"
// import 'firebase/firestore';
const firebaseConfig = {
  apiKey: "AIzaSyBEOTxTfLg9jG4gmDsFtew4THoVS1pWyFg",
  authDomain: "signuplogin-7fb96.firebaseapp.com",
  projectId: "signuplogin-7fb96",
  storageBucket: "signuplogin-7fb96.appspot.com",
  messagingSenderId: "873899569910",
  appId: "1:873899569910:web:e60e57a7ab6353051232d7",
  measurementId: "G-WS4L6P9G45"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app);
// export{app,auth,db}