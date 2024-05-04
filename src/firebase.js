import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8C-akhw2I41WHD9YH7meysCHDIQatlKk",
  authDomain: "nasawebapp.firebaseapp.com",
  projectId: "nasawebapp",
  storageBucket: "nasawebapp.appspot.com",
  messagingSenderId: "655671778958",
  appId: "1:655671778958:web:05c213fb82782c5d9af3df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
