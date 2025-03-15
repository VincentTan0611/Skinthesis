import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAlozlYNKHazw1fo6Yctutozm5F5Se__7k",
    authDomain: "skinthesis-6fb91.firebaseapp.com",
    projectId: "skinthesis-6fb91",
    storageBucket: "skinthesis-6fb91.firebasestorage.app",
    messagingSenderId: "791217218819",
    appId: "1:791217218819:web:78f2e85003702bde55b536",
    measurementId: "G-LSDWFVFW0G"
  };
  
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);


export { app, auth, firestore };