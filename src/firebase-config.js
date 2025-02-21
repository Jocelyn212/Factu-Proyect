import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBYIiJP29LrKTL4iAvkz0uK-Q3-5C50OnY",
    authDomain: "proyecto-edu-4d549.firebaseapp.com",
    projectId: "proyecto-edu-4d549",
    storageBucket: "proyecto-edu-4d549.firebasestorage.app",
    messagingSenderId: "797364011927",
    appId: "1:797364011927:web:5ea6956b60dd9dbfa8fad2"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

