
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC8tL9sObFywPWMHPBPk9xVqmrk-o9NPBU",
  authDomain: "valwera-sports.firebaseapp.com",
  projectId: "valwera-sports",
  storageBucket: "valwera-sports.appspot.com",
  messagingSenderId: "876235567923",
  appId: "1:876235567923:web:db29f4f7312f0fd3c18b33",
  measurementId: "G-7EX4MPHJM7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
