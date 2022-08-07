// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAuelnANS1iBfZ-9Gr7GO2zNSSVmsVqng4",
  authDomain: "crudtutorial-f4e6b.firebaseapp.com",
  projectId: "crudtutorial-f4e6b",
  storageBucket: "crudtutorial-f4e6b.appspot.com",
  messagingSenderId: "889761094173",
  appId: "1:889761094173:web:86d1dfbceffbbe30fb44f4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);