import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

// Firebase config
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

// Get references to input fields
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const submit = document.querySelector('button');

// Handle sign-up form submission
if (submit && document.getElementById('signup-form')) {
    submit.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent form submission

        const emailValue = email.value;
        const passwordValue = password.value;

        // Firebase sign-up logic
        createUserWithEmailAndPassword(auth, emailValue, passwordValue)
            .then((userCredential) => {
                const user = userCredential.user;
                alert("Sign Up successful!");

                // Save user information to localStorage
                const userData = {
                    firstName: firstName.value,
                    lastName: lastName.value,
                    email: user.email
                };
                localStorage.setItem("loggedInUser", JSON.stringify(userData));

                // Redirect to sign-in page (or handle the next step accordingly)
                window.location.href = "signin.html";
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert("Error: " + errorMessage);
            });
    });
}
