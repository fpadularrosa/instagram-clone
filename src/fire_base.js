import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAleIFAAdpveLKxFaD_7fDsMMWCQUeJcqM",
    authDomain: "instagram-clone-959e8.firebaseapp.com",
    projectId: "instagram-clone-959e8",
    storageBucket: "instagram-clone-959e8.appspot.com",
    messagingSenderId: "604512857338",
    appId: "1:604512857338:web:185ec86ffeec16e2392d43",
    measurementId: "G-SNXZSREWCG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);