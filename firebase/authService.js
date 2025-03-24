import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";  // Uvoz Firebase autentifikacije
import { sendEmailVerification } from "firebase/auth";


// Funkcija za registraciju korisnika
export const registerUser = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    return userCredential;
  } catch (error) {
    throw error;
  }
};

// Funkcija za prijavu korisnika
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    if (!userCredential.user.emailVerified) {
      throw new Error("Email nije verifikovan. Proverite inbox i potvrdite email.");
    }
    console.log("User logged in:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error logging in user:", error.code, error.message);
    throw error;
  }
};
/*export const registerUser = async (email, password, userType, data, image = null) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Upload slike ako postoji
    let imageURL = null;
    if (image) {
      imageURL = await uploadImageAsync(image, user.uid);
    }

    // Snimi korisnika u Firestore
    await saveUserToFirestore(user.uid, userType, data, imageURL);

    // Pošalji verifikacioni email
    await sendEmailVerification(user);

    return userCredential;
  } catch (error) {
    throw error;
  }
};
*/



