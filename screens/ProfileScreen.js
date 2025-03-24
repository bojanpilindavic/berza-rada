import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from "react-native";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const ProfileScreen = () => {
  const db = getFirestore();
  const auth = getAuth();
  const user = auth.currentUser;

  const [userData, setUserData] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setEditedData(data); // Postavi i podatke za uređivanje
        } else {
          Alert.alert("Greška", "Podaci o korisniku nisu pronađeni.");
        }
      } catch (error) {
        console.error("Greška pri dohvaćanju podataka:", error);
        Alert.alert("Greška", "Nije moguće dohvatiti podatke o korisniku.");
      }
    };

    fetchUserData();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, editedData);
      setUserData((prev) => ({ ...prev, ...editedData }));
      setEditing(false);
      Alert.alert("✅ Uspeh", "Podaci su uspešno ažurirani.");
    } catch (error) {
      console.error("❌ Greška pri ažuriranju profila:", error);
      Alert.alert("Greška", "Došlo je do greške prilikom čuvanja promena.");
    }
  };

  if (!userData) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>👤 Moj profil</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.data}>{userData.email}</Text>

      {userData.userType === "worker" ? (
        <>
          <Text style={styles.label}>Ime i prezime:</Text>
          {editing ? (
            <TextInput
              value={editedData.fullName}
              onChangeText={(text) => setEditedData({ ...editedData, fullName: text })}
              style={styles.input}
            />
          ) : (
            <Text style={styles.data}>{userData.fullName}</Text>
          )}

          <Text style={styles.label}>Opština:</Text>
          {editing ? (
            <TextInput
              value={editedData.municipality}
              onChangeText={(text) => setEditedData({ ...editedData, municipality: text })}
              style={styles.input}
            />
          ) : (
            <Text style={styles.data}>{userData.municipality}</Text>
          )}
        </>
      ) : (
        <>
          <Text style={styles.label}>Naziv firme:</Text>
          {editing ? (
            <TextInput
              value={editedData.companyName}
              onChangeText={(text) => setEditedData({ ...editedData, companyName: text })}
              style={styles.input}
            />
          ) : (
            <Text style={styles.data}>{userData.companyName}</Text>
          )}

          <Text style={styles.label}>JIB:</Text>
          {editing ? (
            <TextInput
              value={editedData.jib}
              onChangeText={(text) => setEditedData({ ...editedData, jib: text })}
              style={styles.input}
            />
          ) : (
            <Text style={styles.data}>{userData.jib}</Text>
          )}

          <Text style={styles.label}>Delatnost:</Text>
          {editing ? (
            <TextInput
              value={editedData.activity}
              onChangeText={(text) => setEditedData({ ...editedData, activity: text })}
              style={styles.input}
            />
          ) : (
            <Text style={styles.data}>{userData.activity}</Text>
          )}

          <Text style={styles.label}>Opština:</Text>
          {editing ? (
            <TextInput
              value={editedData.municipality}
              onChangeText={(text) => setEditedData({ ...editedData, municipality: text })}
              style={styles.input}
            />
          ) : (
            <Text style={styles.data}>{userData.municipality}</Text>
          )}
        </>
      )}

      {!editing ? (
        <TouchableOpacity onPress={() => setEditing(true)} style={styles.editButton}>
          <Text style={styles.editButtonText}>✏️ Izmeni profil</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={handleSaveChanges} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>💾 Sačuvaj promene</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontWeight: "600",
    marginTop: 10,
  },
  data: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
  },
  editButton: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  editButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#28a745",
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
