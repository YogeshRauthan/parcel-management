import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwz-gFVssSNG70IIC4jCU1i5lQr40eaGk",
  authDomain: "parcel-management-377d6.firebaseapp.com",
  projectId: "parcel-management-377d6",
  storageBucket: "parcel-management-377d6.appspot.com",
  messagingSenderId: "162431817941",
  appId: "1:162431817941:web:7f8e86f18da638edc92a5c",
  measurementId: "G-0WJ886NPPJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { app, auth };