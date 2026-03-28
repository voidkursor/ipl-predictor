import { auth, provider, signInWithPopup, signOut, onAuthStateChanged } from "./firebase.js";
import matches from "./matches.js";
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

//display schedule
function renderMatches(){
    const container = document.getElementById("matches-container");
    container.innerHTML="";

    matches.forEach(match => {
        const matchDate = new Date(`${match.date}T${match.time}:00+05:30`);
        const now=new Date();
        const isPast=now > matchDate;

        const card=document.createElement("div");
        card.className= "match-card";
        card.innerHTML =`
                <div class="match-teams">
                    <span class="team">${match.short1}</span>
                    <span class="VS">VS</span>
                    <span class="team">${match.short2}</span>
                </div>
                <div class="match-details">
                <p>${match.team1} vs ${match.team2}</p>
                <p>📅 ${match.date} at ${match.time}</p>
                <p>📍 ${match.venue}</p>
                </div>
                <button class="predict-btn" 
                ${isPast ? "disabled" : ""} 
                onclick="window.location.href='predict.html?matchId=${match.id}'">
                ${isPast ? "Prediction Closed" : "Make Prediction"}
                 </button>
        `;
        container.appendChild(card);
    });
}

renderMatches();