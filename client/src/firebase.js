// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import.meta.env.VITE_FIREBASE_API_KEY
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "project-team-7-blog.firebaseapp.com",
  projectId: "project-team-7-blog",
  storageBucket: "project-team-7-blog.appspot.com",
  messagingSenderId: "261108688931",
  appId: "1:261108688931:web:e5b27dbb13d112fcff2996"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);