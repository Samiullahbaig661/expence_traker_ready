// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCUadWUANn_XxcxiU0HVZRky4sUVEP2sD8",
  authDomain: "expensetraker-86d0c.firebaseapp.com",
  projectId: "expensetraker-86d0c",
  storageBucket: "expensetraker-86d0c.firebasestorage.app",
  messagingSenderId: "950249729697",
  appId: "1:950249729697:web:82889bf0a44d2ac1f34ae0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Auth
export const auth = getAuth(app);

export default app;

