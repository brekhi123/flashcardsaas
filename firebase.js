// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAycZMAQGFJ7mu_fdJmynvMmeK7D1s6h_s",
  authDomain: "flashcardsaas-e948d.firebaseapp.com",
  projectId: "flashcardsaas-e948d",
  storageBucket: "flashcardsaas-e948d.appspot.com",
  messagingSenderId: "731259977407",
  appId: "1:731259977407:web:a653161e79a4cb18f9100a",
  measurementId: "G-8HH18VKL22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app)


export {db}