import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";  // Uvoz Firebase autentifikacije

// Funkcija za registraciju korisnika
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User registered:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error registering user:", error.code, error.message);
    throw error;
  }
};

// Funkcija za prijavu korisnika
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in user:", error.code, error.message);
    throw error;
  }
};
