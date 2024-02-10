
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

import { firebaseConfig } from './firebase_config.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase App here if not already initialized

const auth = getAuth(app);

export const checkAuthState = (callback) => {
    onAuthStateChanged(auth, (user) => {
        callback(!!user);
    });
};

const signupForm = document.getElementById('signup-form');
if (signupForm) {
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('user-email').value;
        const password = document.getElementById('user-password').value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Sign-up successful.
                const user = userCredential.user;
                // Redirect to main content page
                window.location.href = 'index.html';
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // Handle errors here, such as displaying a message
                console.error("Error signing up:", errorCode, errorMessage);
            });
    });
}

// Google Sign-In
export const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access Google APIs.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // Redirect to your main application page or handle the user info as needed
        window.location.href = 'map.html'; // Example redirect
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // Show an error message or handle the error appropriately
        console.error("Error during Google sign-in:", errorMessage);
    });
};

// Attach the Google sign-in function to a button click or other event
const googleSignInBtn = document.getElementById('google-sign-in-btn');
if (googleSignInBtn) {
    googleSignInBtn.addEventListener('click', googleSignIn);
}
