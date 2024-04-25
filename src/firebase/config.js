// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAakY-mVeprzJ3Bue1OeGS-ZIrIcenFv4",
  authDomain: "react-journal-631e5.firebaseapp.com",
  projectId: "react-journal-631e5",
  storageBucket: "react-journal-631e5.appspot.com",
  messagingSenderId: "488272676074",
  appId: "1:488272676074:web:aa821858b00a3463cfc393",
  measurementId: "G-EMV9V5CLCZ",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);
