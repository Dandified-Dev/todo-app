// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-DLJfYDIoquGYVV_BOCQ--B63R0H4aqY",
  authDomain: "todo-app-bc353.firebaseapp.com",
  projectId: "todo-app-bc353",
  storageBucket: "todo-app-bc353.appspot.com",
  messagingSenderId: "27447843697",
  appId: "1:27447843697:web:b1c416e969896a7ce934d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);