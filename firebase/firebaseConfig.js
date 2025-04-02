import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 👈 Dodaj ovo

const firebaseConfig = {
  apiKey: "AIzaSyBXCv95kWUiesR-AEMNcpXDS0ac_ZtS4ag",
  authDomain: "my-job-rais.firebaseapp.com",
  projectId: "my-job-rais",
  storageBucket: "my-job-rais.appspot.com",
  messagingSenderId: "970875178193",
  appId: "1:970875178193:web:00f7ea74b5624ca63389f0",
  measurementId: "G-E47F0GS61M",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app); 

export { app, auth, db }; 
