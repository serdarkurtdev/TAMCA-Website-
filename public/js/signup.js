// Import the Firebase SDK.
const firebase = require('firebase');

// Initialize Firebase.
firebase.initializeApp({
  apiKey: "AIzaSyDDWF7ZTpiUySdlvdrckwFLhuhVItEtYzc",
  projectId: "tamca-32b6f",
  appId: "1:270078571509:web:91877bf478b18ecfa2e6bc",
  authDomain: "tamca-32b6f.firebaseapp.com",
  databaseURL: "https://tamca-32b6f-default-rtdb.firebaseio.com",
});

// Get the signup button.
const signupButton = document.querySelector('#signUp');

// Get all of the input fields in the signup form.
const inputFields = document.querySelectorAll('input[required]');

// Add an event listener to the signup button.
signupButton.addEventListener('click', () => {
  // Check if all of the input fields have a value.
  const hasValue = inputFields.every((inputField) => inputField.value !== '');

  // If so, create a new user in Firebase.
  if (hasValue) {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User created successfully');
      })
      .catch((error) => {
        console.log(error);
      });
  }
});

// Get the user's data.
const email = document.getElementById('email').value;
const password = document.getElementById('password').value;
const firstName = document.getElementById('firstName').value;

// Create a new document in the users collection.
const usersRef = firebase.database().ref('users');
const userRef = usersRef.push();

// Add the user's data to the document.
userRef.set({
  email: email,
  password: password,
  firstName: firstName,
});
