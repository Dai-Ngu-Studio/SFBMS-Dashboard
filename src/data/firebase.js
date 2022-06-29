import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDi1oNSA6V9hCG2JYx92V0x1aa0jq7dflE",
  authDomain: "sfbms-48a15.firebaseapp.com",
  projectId: "sfbms-48a15",
  storageBucket: "sfbms-48a15.appspot.com",
  messagingSenderId: "736900397142",
  appId: "1:736900397142:web:a3865004d1ad8209d3e3f7",
  measurementId: "G-B768YS73G4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
