import firebase from "firebase/app";
import "firebase/auth";


export const auth =  firebase.initializeApp({
    apiKey: "AIzaSyAZoIXKp4SBy7DazseIc6jII3a9KtZ51zk",
    authDomain: "chatapp-sql.firebaseapp.com",
    projectId: "chatapp-sql",
    storageBucket: "chatapp-sql.appspot.com",
    messagingSenderId: "199417348113",
    appId: "1:199417348113:web:67869d3d3ed834b9f231b0",
    measurementId: "G-EQ5VGTTFP5"
  }).auth();