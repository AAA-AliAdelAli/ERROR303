import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import firebase from '@react-native-firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyDI0Frx65u_iQWxDnGhSAKNez3nGCkLewQ",
  authDomain: "error303-a9e3b.firebaseapp.com",
  projectId: "error303-a9e3b",
  storageBucket: "error303-a9e3b.appspot.com",
  messagingSenderId: "15796680137",
  appId: "1:15796680137:web:45d0e3663f438b1c752418",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);

}




const auth = firebase.auth();

export { auth };