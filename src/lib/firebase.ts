// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCPIoOLZUlKr1P9wtM9T6DnMtxFGIZW-eQ",
    authDomain: "first-firebase-312be.firebaseapp.com",
    projectId: "first-firebase-312be",
    storageBucket: "first-firebase-312be.firebasestorage.app",
    messagingSenderId: "838733049176",
    appId: "1:838733049176:web:5ac152e9e73dd11dc0092d",
    measurementId: "G-9NLFPMFHSB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);