import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "./firebaseConfig";

// Registracija korisnika + slanje verifikacionog emaila
export const registerUser = async (email, password) => {
  try {
    const cleanEmail = email.trim().toLowerCase();

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      cleanEmail,
      password
    );

    await sendEmailVerification(userCredential.user);

    return userCredential;
  } catch (error) {
    throw error;
  }
};

// Prijava korisnika + provera verifikacije emaila
export const loginUser = async (email, password) => {
  try {
    const cleanEmail = email.trim().toLowerCase();

    const userCredential = await signInWithEmailAndPassword(
      auth,
      cleanEmail,
      password
    );

    if (!userCredential.user.emailVerified) {
      throw new Error(
        "Email nije verifikovan. Proverite inbox i potvrdite email."
      );
    }

    console.log("User logged in:", userCredential.user.email);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in user:", error?.code, error?.message);
    throw error;
  }
};
