import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApHAjBG1jSw1SWhQUZtDNGq8pkuw9w5jM",
  authDomain: "neoshop-db8af.firebaseapp.com",
  projectId: "neoshop-db8af",
  storageBucket: "neoshop-db8af.appspot.com",
  messagingSenderId: "296577301670",
  appId: "1:296577301670:web:0b758d4f575db1d7fec867",
  measurementId: "G-2SF18K2VYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export { auth, app };