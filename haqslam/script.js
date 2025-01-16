// Import necessary functions from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Your web app's Firebase configuration (replace with your own config)
const firebaseConfig = {
   apiKey: "AIzaSyAIZAWQofWD3lbTZmJOBr1U6sjNtT0wh7s",
   authDomain: "login-example-b3535.firebaseapp.com",
   projectId: "login-example-b3535",
   storageBucket: "login-example-b3535.firebasestorage.app",
   messagingSenderId: "412361146272",
   appId: "1:412361146272:web:77f4f92a37a2e29ee9eec5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Get references to the input fields and the submit button
const email = document.getElementById('email');
const password = document.getElementById('password');
const submit = document.getElementById('submit');

// Handle Login
if (submit && document.getElementById('login-form')) {
    submit.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent form submission

        const emailValue = email.value;
        const passwordValue = password.value;

        // Sign in with Firebase
        signInWithEmailAndPassword(auth, emailValue, passwordValue)
            .then((userCredential) => {
                const user = userCredential.user;
                alert("Login successful! Welcome, " + user.email);
                // Redirect to home page after login
                window.location.href = "index.html"; // Change the redirect link as needed
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Error: " + errorMessage);
            });
    });
}

// Handle Signup
if (submit && document.getElementById('register-form')) {
    submit.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent form submission

        const emailValue = email.value;
        const passwordValue = password.value;
        const confirmPasswordValue = document.getElementById('confirm-password').value;

        // Check if passwords match
        if (passwordValue !== confirmPasswordValue) {
            alert("Passwords do not match!");
            return;
        }

        // Sign up with Firebase
        createUserWithEmailAndPassword(auth, emailValue, passwordValue)
            .then((userCredential) => {
                const user = userCredential.user;
                alert("Account created successfully! Welcome, " + user.email);
                // Redirect to login page after signup
                window.location.href = "signin.html"; // Change the redirect link as needed
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Error: " + errorMessage);
            });
    });
}
