import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

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
export const db = getFirestore(app);

// Get a list of cities from your database
// async function getCities(db) {
//   const postsCol = collection(db, 'posts');
//   const citySnapshot = await getDocs(postsCol);
//   const cityList = citySnapshot.docs.map(doc => doc.data());
//   return cityList;
// }
