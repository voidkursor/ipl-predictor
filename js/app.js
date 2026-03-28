import { auth, provider, signInWithPopup, signOut, onAuthStateChanged } from "./firebase.js";

const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userInfo = document.getElementById("userInfo");

// Listen for auth state changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is logged in
        userInfo.textContent = `Welcome, ${user.displayName}`;
        loginBtn.style.display = "none";
        logoutBtn.style.display = "block";
    } else {
        // User is logged out
        userInfo.textContent = "";
        loginBtn.style.display = "block";
        logoutBtn.style.display = "none";
    }
});

// Login
loginBtn.addEventListener("click", async () => {
    try {
        await signInWithPopup(auth, provider);
    } catch (error) {
        console.error("Login failed:", error);
    }
});

// Logout
logoutBtn.addEventListener("click", async () => {
    try {
        await signOut(auth);
    } catch (error) {
        console.error("Logout failed:", error);
    }
});