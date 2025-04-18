import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Linking,
} from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { getAuth } from "firebase/auth";

const EmployerApplicationsScreen = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const jobsQuery = query(
          collection(db, "jobs"),
          where("userId", "==", currentUser.uid)
        );

        const jobsSnapshot = await getDocs(jobsQuery);
        const jobIds = jobsSnapshot.docs.map((doc) => doc.id);

        if (jobIds.length === 0) {
          setApplications([]);
          setLoading(false);
          return;
        }

        const appsQuery = query(
          collection(db, "applications"),
          where("employerId", "==", currentUser.uid)
        );

        const appsSnapshot = await getDocs(appsQuery);

        const data = appsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setApplications(data);
      } catch (error) {
        console.error("Greška pri dohvatanju prijava:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  const openCV = (uri) => {
    Linking.openURL(uri).catch((err) =>
      console.error("Greška pri otvaranju CV-a", err)
    );
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#5B8DB8" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📥 Prijave na vaše oglase</Text>
      {applications.length === 0 ? (
        <Text style={styles.noAppsText}>Nema prijava.</Text>
      ) : (
        <FlatList
          data={applications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.applicantName}>👤 {item.name}</Text>
              <Text style={styles.email}>📧 {item.email}</Text>
              <Text style={styles.message}>💬 Poruka: {item.message || "Bez poruke"}</Text>
              <Text style={styles.cv} onPress={() => openCV(item.cvUri)}>
                📎 CV: {item.cvName || "Nema naziva"}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: "#F0F0F0",
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#274E6D",
  },
  card: {
    backgroundColor: "#FFFFE3",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  applicantName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#274E6D",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#274E6D",
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: "#274E6D",
    marginBottom: 4,
  },
  cv: {
    fontSize: 14,
    color: "#5B8DB8",
    marginTop: 4,
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noAppsText: {
    fontSize: 16,
    color: "gray",
    marginTop: 30,
  },
});

export default EmployerApplicationsScreen;
