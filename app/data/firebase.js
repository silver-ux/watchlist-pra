// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCnLSmf_NqvPK1CxkWK-8caSZtHQAU1z1w",
    authDomain: "mylist-movie.firebaseapp.com",
    projectId: "mylist-movie",
    storageBucket: "mylist-movie.firebasestorage.app",
    messagingSenderId: "613582219355",
    appId: "1:613582219355:web:c93c4c29ad114b429f777e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;