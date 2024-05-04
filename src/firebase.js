import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhASL10rDzuMLk4mS1nigbVxfjodzkM3Y",
  authDomain: "af-nasa.firebaseapp.com",
  projectId: "af-nasa",
  storageBucket: "af-nasa.appspot.com",
  messagingSenderId: "668731993191",
  appId: "1:668731993191:web:1d00827a16f97a1f41f8c2",
  measurementId: "G-C916452V40"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
