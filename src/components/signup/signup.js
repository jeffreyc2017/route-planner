import { initializeApp } from 'firebase/app';
import { getAuth, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";

const firebase_config = process.env.FIREBASE_CONFIG;

// Initialize Firebase
const app = initializeApp(firebase_config);
const analytics = getAnalytics(app);

const auth = getAuth(app);

export const checkAuthState = (callback) => {
    onAuthStateChanged(auth, (user) => {
        callback(!!user);
    });
};

// Combined Sign In/Up Form
const authForm = document.getElementById('auth-form');
if (authForm) {
    authForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('user-email').value;
        const password = document.getElementById('user-password').value;

        // Attempt to sign in
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Sign-in successful.
                console.log('User signed in successfully.');
                window.location.href = 'index.html'; // Redirect to main content page
            })
            .catch((signInError) => {
                if (signInError.code === 'auth/invalid-credential') {
                    // If user doesn't exist or wrong password, attempt to sign up
                    createUserWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            // Sign-up successful.
                            console.log('User created successfully, sending verification email...');
                            sendVerificationEmail(userCredential.user);
                            
                            // Optionally, inform the user to check their email for the verification link
                            alert('Please check your email to verify your account.');
                        })
                        .catch((error) => {
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            console.error("Error signing up:", errorCode, errorMessage);
                        });
                } else {
                    console.error("Error signing in:", signInError.code, signInError.message);
                }
            });
    });
}

function sendVerificationEmail(user) {
    sendEmailVerification(user)
        .then(() => {
            // Email verification sent!
            console.log('Verification email sent.');
        })
        .catch((error) => {
            // Handle Errors here.
            console.error('Error sending email verification:', error);
        });
}

// Google Sign-In Functionality as before
export const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
        // Google sign-in successful.
        window.location.href = 'map.html'; // Redirect on successful sign-in
    }).catch((error) => {
        console.error("Error during Google sign-in:", error.message);
    });
};

const googleSignInBtn = document.getElementById('google-sign-in-btn');
if (googleSignInBtn) {
    googleSignInBtn.addEventListener('click', googleSignIn);
}

// Sign Out Functionality as before
export const signOutUser = () => {
    signOut(auth).then(() => {
      console.log('User signed out.');
      window.location.href = './signup.html'; // Redirect to signup page after sign out
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
};
