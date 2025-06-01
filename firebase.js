// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW525urmyPsJSo2yZ39pgxfYNjBALUfwI",
  authDomain: "vintara-366ce.firebaseapp.com",
  projectId: "vintara-366ce",
  storageBucket: "vintara-366ce.firebasestorage.app",
  messagingSenderId: "653674319921",
  appId: "1:653674319921:web:0e41102aefd9a269008510"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);