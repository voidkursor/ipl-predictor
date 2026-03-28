import { db } from "./firebase.js";
import { auth, onAuthStateChanged, provider, signInWithPopup, signOut } from "./firebase.js";
import { collection, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";
import matches from "./matches.js";

const userInfo=document.getElementById("userInfo");
const loginBtn=document.getElementById("loginBtn");
const logoutBtn=document.getElementById("logoutBtn");
const leaderboradBody=document.getElementById("leaderboard-body");
const loadingMsg=document.getElementById("loading-msg");


//Auth
onAuthStateChanged(auth ,(user) =>{
    if(user){
        userInfo.textContent=`Welcome, ${user.displayName}`;
        loginBtn.style.display="none";
        logoutBtn.style.display="block";
    }else{
        userInfo.textContent="";
        loginBtn.style.display="block";
        logoutBtn.style.display="none";
    }
});

loginBtn.addEventListener("click", async()=>await signInWithPopup(auth,provider));
logoutBtn.addEventListener("click", async() =>await signOut(auth));

//leaderBoard Calculation

async function calculateLeaderBoard(){
     //Get All predictions
     const predictionsSnap=await getDocs(collection(db,"predictions"));
     const predictions=[];
     predictionsSnap.forEach(doc =>predictions.push(doc.data()));

     //Get All Results
     const resultsSnap=await getDocs(collection(db,"results"));
     const results={};
     resultsSnap.forEach(doc =>results[doc.id]=doc.data());

     //calculate points per user
     const userPoints={};
     predictions.forEach(pred=> {
        const result=results[pred.matchId];
        if(!result) return; //no result entered yet for this match
        if(!userPoints[pred.userId]){
            userPoints[pred.userId]={
                name:pred.userName,
                points:0,
                correct_winner:0,
                correct_mom:0
            };
        }
        let points=0;
        if(pred.predictedWinner === result.winner){
            points+=2;
            userPoints[pred.userId].correct_winner++;
        }
        if(pred.predictedMOM===result.mom){
            points+=3;
            userPoints[pred.userId].correct_mom++;
        }
        userPoints[pred.userId].points+=points;
     });

     //sort by points
     const sorted=Object.values(userPoints).sort((a,b)=>b.points=a.points);
     loadingMsg.style.display="none";
     if(sorted.length===0){
        leaderboradBody.innerHTML=`<tr><td colspan="5" style="text-align:center; color:#aaa;">No results yet. Check back after matches!</td></tr>`;
        return;
     }
     sorted.forEach((user,index) =>{
        const row=document.createElement("tr");
        row.innerHTML=`
        <td>${index+1}</td>
        <td>${user.name}</td>
        <td>${user.points}</td>
        <td>${user.correct_winner}</td>
        <td>${user.correct_mom}</td>
        `;
        if(index===0) row.classList.add("gold");
        if(index===1) row.classList.add("silver");
        if(index===2) row.classList.add("bronze");
        leaderboradBody.appendChild(row);
     })
}
calculateLeaderBoard();