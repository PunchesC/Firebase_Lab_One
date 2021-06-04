import firebase from "firebase/app"
import "firebase/auth";

// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDlZVkU8khx4qlUahiqokAidPBkbihcdzI",
    authDomain: "shout-outs-lab-36550.firebaseapp.com",
    projectId: "shout-outs-lab-36550",
    storageBucket: "shout-outs-lab-36550.appspot.com",
    messagingSenderId: "234679744368",
    appId: "1:234679744368:web:3a77bcd4c1fc2190a0c1b5",
    measurementId: "G-EXTLCSD77G"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export function signInWithGoogle(): void {
    firebase.auth().signInWithPopup(authProvider);
  }

  export function signOut(): void {
    firebase.auth().signOut();
  }

  export const authProvider = new firebase.auth.GoogleAuthProvider();
  export default firebase;