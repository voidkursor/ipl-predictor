import { initializeApp } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB965XGWY5mMOKswemY3XtprxECTG1EzS4",
    authDomain: "ipl-predictor-be394.firebaseapp.com",
    projectId: "ipl-predictor-be394",
    storageBucket: "ipl-predictor-be394.firebasestorage.app",
    messagingSenderId: "10394417650005",
    appId: "1:1039441765005:web:f514fcd2b491f37ee478c4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

export { auth, db, provider, signInWithPopup, signOut, onAuthStateChanged };