// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAK0Q4YPPWF77NVmDIwysO1Rj7hocThsPM",
  authDomain: "csai-website-a2dbe.firebaseapp.com",
  projectId: "csai-website-a2dbe",
  storageBucket: "csai-website-a2dbe.appspot.com",
  messagingSenderId: "936136890988",
  appId: "1:936136890988:web:262a1794ebd2a379525649",
  measurementId: "G-PCGYCYWLYR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log("Firestore DB:", db);
export {app, db};