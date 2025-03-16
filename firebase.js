// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDtQLjjlmC1W7SnjJbo1VL9yT3I3g1OHwo",
  authDomain: "mi-sitio-web-lz2079.firebaseapp.com",
  projectId: "mi-sitio-web-lz2079",
  storageBucket: "mi-sitio-web-lz2079.firebasestorage.app",
  messagingSenderId: "69647400917",
  appId: "1:69647400917:web:cd0807bfca8b27a768475c",
  measurementId: "G-QG4N9CVETC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);