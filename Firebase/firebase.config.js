// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Add this import

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-BWNhNkzfMOhjHjRX5c_YAG2WZb-buhQ",
  authDomain: "food-expanse-tracker.firebaseapp.com",
  projectId: "food-expanse-tracker",
  storageBucket: "food-expanse-tracker.appspot.com", // Fixed the storage bucket URL
  messagingSenderId: "102634045349",
  appId: "1:102634045349:web:fc1d831b0c49560007b24c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app); // Export auth service
export default app;