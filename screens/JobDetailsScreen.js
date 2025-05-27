import React, { useState, useEffect, useLayoutEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove
} from "firebase/firestore";
import { MaterialIcons } from "@expo/vector-icons";


const JobDetailsScreen = ({ route, navigation }) => {
  const { job } = route.params;
  const auth = getAuth();
  const user = auth.currentUser;
  const employer = job.userId;

  // Da li je trenutni korisnik poslodavac
  const isEmployer = user && user.uid === employer;
  const canApply = !isEmployer;

  // Firestore ref i stanje za sačuvane oglase
  const db = getFirestore();
  const userDoc = user ? doc(db, "users", user.uid) : null;
  const [isSaved, setIsSaved] = useState(false);

  // Provera pri mount-u da li je oglas već sačuvan
  useEffect(() => {
    if (!userDoc) return;
    (async () => {
      const snap = await getDoc(userDoc);
      const savedJobs = snap.exists() ? snap.data().savedJobs || [] : [];
      setIsSaved(savedJobs.includes(job.id));
    })();
  }, [userDoc, job.id]);

  // Toggle čuvanja oglasa u Firestore
  const toggleSave = async () => {
    if (!userDoc) return;
    try {
      if (isSaved) {
        await updateDoc(userDoc, { savedJobs: arrayRemove(job.id) });
      } else {
        await updateDoc(userDoc, { savedJobs: arrayUnion(job.id) });
      }
      setIsSaved(prev => !prev);
    } catch (e) {
      console.error("Greška pri čuvanju oglasa:", e);
    }
  };

  // Postavljanje zvezdice u header
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={toggleSave} style={{ marginRight: 16 }}>
  <MaterialIcons
    name={isSaved ? "star" : "star-border"}
    size={24}
    color={isSaved ? "#FFD700" : "#75D5C2"}  // nepopunjena kontura u plavoj
  />
</TouchableOpacity>
      )
    });
  }, [navigation, isSaved]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {job.logo && <Image source={{ uri: job.logo }} style={styles.logo} />}

      <Text style={styles.company}>{job.companyName}</Text>
      <Text style={styles.position}>{job.position}</Text>
      <Text style={styles.location}>📍 {job.municipality}</Text>
      <Text style={styles.deadline}>
        ⏳ Konkurs otvoren do: {job.endDate}
      </Text>
      <Text style={styles.positions}>
        👥 Broj pozicija: {job.numberOfPositions}
      </Text>

      <View style={styles.separator} />

      <Text style={styles.sectionTitle}>Opis posla</Text>
      <Text style={styles.text}>
        {job.description || "Opis nije unesen."}
      </Text>

      <Text style={styles.sectionTitle}>Uslovi</Text>
      <Text style={styles.text}>
        {job.conditions || "Uslovi nisu navedeni."}
      </Text>

      {canApply && (
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => {
            if (user) {
              navigation.navigate("ApplyScreen", {
                jobId: job.id,
                uid: user.uid,
                employer
              });
            } else {
              navigation.navigate("LoginScreen");
            }
          }}
        >
          <Text style={styles.applyButtonText}>📨 Prijavi se</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#e6f0fa",
    flexGrow: 1
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 15,
    borderRadius: 10,
    resizeMode: "contain"
  },
  company: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#274E6D"
  },
  position: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    color: "#274E6D"
  },
  location: {
    textAlign: "center",
    marginTop: 5,
    color: "#555"
  },
  deadline: {
    textAlign: "center",
    marginTop: 5,
    color: "#555"
  },
  positions: {
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
    color: "#555"
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#274E6D"
  },
  text: {
    fontSize: 15,
    color: "#333",
    marginBottom: 15,
    lineHeight: 22
  },
  applyButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#5B8DB8",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 40
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});

export default JobDetailsScreen;
