import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVJNDUd7QE55XGmxRoYlFJ97rfNArO4EM",
  authDomain: "orvio-b275c.firebaseapp.com",
  projectId: "orvio-b275c",
  storageBucket: "orvio-b275c.firebasestorage.app",
  messagingSenderId: "1035177564352",
  appId: "1:1035177564352:web:8808ecfe35eb7695573525"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);