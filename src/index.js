
import { checkAuthState } from './components/signup/auth';
import './components/map/map';

checkAuthState((isAuthenticated) => {
    const path = window.location.pathname;

    // Redirect unauthenticated users to signup.html if not already there
    if (!isAuthenticated && !path.endsWith('/signup.html')) {
        console.log("Not authenticated, redirecting to signup...");
        window.location.href = './signup.html';
    } 
    // Redirect authenticated users to map.html if they're on signup.html or index.html
    else if (isAuthenticated && (path.endsWith('/signup.html') || path === '/' || path.endsWith('/index.html'))) {
        console.log("Authenticated, redirecting to map...");
        window.location.href = './map.html'; 
    }
    // Add any other specific redirections or logic for authenticated users on other pages if necessary
});
