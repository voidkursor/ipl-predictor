import { auth, db, onAuthStateChanged, provider, signInWithPopup, signOut } from "./firebase.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";
import matches from "./matches.js";

//MatchId from URL
const params=new URLSearchParams(window.location.search);
const matchId=parseInt(params.get("matchId"));
const match=matches.find(m=>m.id==matchId);

const matchTitle=document.getElementById("match-title");
const matchDate=document.getElementById("match-date");
const matchVenue=document.getElementById("match-venue");
const winnerOptions=document.getElementById("winner-options");
const submitBtn=document.getElementById("submitBtn");
const formMessage=document.getElementById("form-message");
const userInfo=document.getElementById("userInfo");
const loginBtn=document.getElementById("loginBtn");
const logoutBtn=document.getElementById("logoutBtn");

//Auth

onAuthStateChanged(auth, async(user) => {
    if(user){
        userInfo.textContent =` Welcome, ${user.displayName}`;
        loginBtn.style.display ="none";
        logoutBtn.style.display= "block";
        await checkExistingPrediction(user.uid);
    } else {
        userInfo.textContent="";
        loginBtn.style.display ="block";
        logoutBtn.style.display ="none";
        formMessage.textContent="Please Login to make Prediction";
        submitBtn.disabled= true;
    }
});

loginBtn.addEventListener("click", async() =>{
    await signInWithPopup(auth,provider);
});
logoutBtn.addEventListener("click", async() =>{
    await signOut(auth);
});

//Load Match Info
if(match){
    matchTitle.textContent= `${match.team1} vs ${match.team2}`;
    matchDate.textContent=`📅 ${match.date} at ${match.time}`;
    matchVenue.textContent=`📍 ${match.venue}`;
    //radio buttons for winner 
    [match.team1 , match.team2].forEach(team => {
        const label= document.createElement("label");
        label.className="radio-label";
        label.innerHTML =`
        <input type="radio" name="winner" value ="${team}" />
         ${team}
         `;
         winnerOptions.appendChild(label);
    });
    //player grid for mom
    const allPlayers=[
        ...match.squad.team1.map(p=>({name:p,team:match.short1})),
        ...match.squad.team2.map(p=>({name:p,team:match.short2}))
    ];
    const momGrid=document.getElementById("mom-grid");
    const selectedDisplay = document.getElementById("selected-mom-display");
    allPlayers.forEach(player=>{
        const card=document.createElement("div");
        card.className="player-card";
        card.innerHTML=`
            <span class="player-team-tag">${player.team}</span>
            <span class="player-name">${player.name}</span>
            `;
        card.addEventListener("click",()=>{
            document.querySelectorAll(".player-card").forEach(c=>c.classList.remove("selected"));
            card.classList.add("selected");
            selectedDisplay.textContent=`✅ ${player.name} (${player.team})`;
            selectedDisplay.dataset.value=player.name;
        });
        momGrid.appendChild(card);
    })
} else {
    matchTitle.textContent= "Match not found";
}

//check if prediction is made 
async function checkExistingPrediction(uid){
    const docRef= doc(db, "predictions", `${uid}_${matchId}`);
    const docSnap=await getDoc(docRef);
    if(docSnap.exists()){
        const data = docSnap.data();
        formMessage.textContent= `✅ You already predicted: ${data.predictedWinner} | MOM: ${data.predictedMOM}`;
        submitBtn.disabled=true;
        document.querySelectorAll('input[name="winner"]').forEach(r=>r.disabled=true);
    }
}

//Submit/Make Prediction
submitBtn.addEventListener("click" , async () => {
    const user=auth.currentUser;
    if(!user){
        formMessage.textContent= "Please Sign in first";
        return;
    }
    const winner=document.querySelector('input[name="winner"]:checked');
    const selectedDisplay=document.getElementById("selected-mom-display");
    const mom=selectedDisplay.dataset.value || "";

    if(!winner){
        formMessage.textContent="Please select a winner";
        return;
    }
    if(!mom){
        formMessage.textContent="Please Select a Man of the Match Player";
        return;
    }

    try {
        submitBtn.disabled=true;
        submitBtn.textContent="Submitting ...";

        await setDoc(doc(db, "predictions", `${user.uid}_${matchId}`), {
            userId: user.uid,
            userName: user.displayName,
            matchId: matchId,
            predictedWinner : winner.value,
            predictedMOM: mom,
            timestamp : new Date().toISOString()
        });

        formMessage.textContent=`✅ Prediction saved! ${winner.value} | MOM: ${mom}`;
        document.querySelectorAll('input[name="winner"]').forEach(r=>r.disabled = true);
    }catch(error) {
        submitBtn.disabled=false;
        submitBtn.textContent="Submit Prediction";
        formMessage.textContent="❌ Error saving prediction. Try again.";
        console.error(error);
    }
});