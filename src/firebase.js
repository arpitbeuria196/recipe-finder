// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4FJodWw6dtkencoVG1GgqsW-I6kMUgtk",
  authDomain: "food-recipe-8eaf3.firebaseapp.com",
  projectId: "food-recipe-8eaf3",
  storageBucket: "food-recipe-8eaf3.appspot.com",
  messagingSenderId: "153893434110",
  appId: "1:153893434110:web:308cfd6b89bc578e0c2baf",
  measurementId: "G-HKJ8QEBVEL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();