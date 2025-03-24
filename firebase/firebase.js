import { getFirestore, doc, setDoc, serverTimestamp } from "firebase/firestore";

const db = getFirestore();

export const saveUserToFirestore = async (uid, userType, data, imageURL = null) => {
  const userData = {
    uid,
    userType,
    email: data.email,
    imageURL: imageURL || null,
    dateCreated: serverTimestamp(),
  };

  if (userType === "worker") {
    userData.fullName = data.fullName;
    userData.municipality = data.municipality;
  } else if (userType === "employer") {
    userData.companyName = data.companyName;
    userData.jib = data.jib;
    userData.activity = data.activity;
    userData.municipality = data.municipality;
  }

  try {
    // Ispravno korišćenje doc() za kreiranje DocumentReference
    await setDoc(doc(db, "users", uid), userData);
    console.log("✅ Korisnik uspešno sačuvan u Firestore");
  } catch (error) {
    console.error("❌ Greška prilikom snimanja korisnika:", error);
  }
};
