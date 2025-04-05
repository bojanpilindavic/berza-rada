import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

const WorkerApplicationsScreen = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        const q = query(
          collection(db, "applications"),
          where("uid", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);

        const apps = [];

        for (const docSnap of querySnapshot.docs) {
          const appData = docSnap.data();
          const jobRef = doc(db, "jobs", appData.jobId);
          const jobSnap = await getDoc(jobRef);

          apps.push({
            id: docSnap.id,
            ...appData,
            job: jobSnap.exists() ? jobSnap.data() : null,
          });
        }

        setApplications(apps);
      } catch (error) {
        console.error("Greška pri dohvatanju prijava:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (applications.length === 0) {
    return (
      <View style={styles.centered}>
        <Text style={styles.noAppsText}>Nemate nijednu prijavu.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Moje prijave</Text>
      <FlatList
        data={applications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.jobTitle}>
              {item.job?.position || "Nepoznat oglas"}
            </Text>
            <Text style={styles.company}>
              Firma: {item.job?.companyName || "Nepoznato"}
            </Text>
            <Text style={styles.message}>
              💬 Poruka: {item.message || "Nema poruke"}
            </Text>
            <Text style={styles.cv}>📎 CV: {item.cvName || "Nepoznat fajl"}</Text>
            <Text style={styles.date}>
              🕒 Prijavljeno:{" "}
              {item.appliedAt
                ? new Date(item.appliedAt.seconds * 1000).toLocaleString()
                : "Nepoznat datum"}
            </Text>
          </View>
        )}
      />
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
  jobTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 6,
  },
  company: {
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 6,
    color: "#444",
  },
  message: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  cv: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    color: "#777",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noAppsText: {
    fontSize: 16,
    color: "gray",
  },
});

export default WorkerApplicationsScreen;
