// Import necessary functions from Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Your Firebase config (replace with your own)
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

// Get references to the input fields and submit button
const email = document.getElementById('email');
const password = document.getElementById('password');
const submit = document.querySelector('button');

// Handle login form submission
if (submit && document.getElementById('signin-form')) {
    submit.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent form submission

        const emailValue = email.value;
        const passwordValue = password.value;

        // Firebase sign-in logic
        signInWithEmailAndPassword(auth, emailValue, passwordValue)
            .then((userCredential) => {
                const user = userCredential.user;
                alert("Login successful! Welcome, " + user.email);

                // Save user information to localStorage
                const userData = {
                    firstName: "User",  // You can retrieve this from Firebase if stored separately
                    lastName: "Name",   // You can retrieve this from Firebase if stored separately
                    email: user.email
                };
                localStorage.setItem("loggedInUser", JSON.stringify(userData));

                // Redirect to profile page
                window.location.href = "profile.html"; // Redirect to profile page after successful login
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Error: " + errorMessage);
            });
    });
}

