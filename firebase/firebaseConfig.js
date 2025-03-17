import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXCv95kWUiesR-AEMNcpXDS0ac_ZtS4ag",
  authDomain: "my-job-rais.firebaseapp.com",
  projectId: "my-job-rais",
  storageBucket: "my-job-rais.appspot.com",
  messagingSenderId: "970875178193",
  appId: "1:970875178193:web:00f7ea74b5624ca63389f0",
  measurementId: "G-E47F0GS61M",
};

// Inicijalizacija Firebase aplikacije
const app = initializeApp(firebaseConfig);

// Inicijalizacija Firebase autentifikacije
const auth = getAuth(app);

export { app, auth };
