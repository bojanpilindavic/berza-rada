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
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Prijave na vaše oglase</Text>
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
              <Text style={styles.message}>
                💬 Poruka: {item.message || "Bez poruke"}
              </Text>
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
    paddingHorizontal: 10,
    marginTop: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  applicantName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  message: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  cv: {
    fontSize: 14,
    color: "#007bff",
    marginTop: 4,
    textDecorationLine: "underline",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noAppsText: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginTop: 30,
  },
});

export default EmployerApplicationsScreen;
