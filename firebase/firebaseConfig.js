// firebase.js

import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";           // ← dodaj ovo
import { getFirestore } from "firebase/firestore";

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

// platform-aware auth init:
const auth = Platform.OS === "web"
  ? getAuth(app)
  : initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });

const db = getFirestore(app);

export { app, auth, db };
