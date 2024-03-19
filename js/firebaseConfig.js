// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut  } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, addDoc, updateDoc, getDocs, query, where, onSnapshot, or, serverTimestamp  } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDWF7ZTpiUySdlvdrckwFLhuhVItEtYzc",
  authDomain: "tamca-32b6f.firebaseapp.com",
  databaseURL: "https://tamca-32b6f-default-rtdb.firebaseio.com",
  projectId: "tamca-32b6f",
  storageBucket: "tamca-32b6f.appspot.com",
  messagingSenderId: "270078571509",
  appId: "1:270078571509:web:91877bf478b18ecfa2e6bc",
  measurementId: "G-9L44SWFGJ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the Firebase app and auth instance
export const auth = getAuth();