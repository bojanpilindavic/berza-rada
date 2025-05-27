import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { auth } from "../firebase/firebaseConfig";
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
        <ActivityIndicator size="large" color="#5B8DB8" />
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
      <Text style={styles.header}>📄 Moje prijave</Text>
      <FlatList
        data={applications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.jobTitle}>{item.job?.position || "Nepoznat oglas"}</Text>
              <Text style={styles.company}>{item.job?.companyName || "Nepoznata firma"}</Text>
            </View>

            <Text style={styles.detail}>💬 Poruka: {item.message || "Nema poruke"}</Text>
            <Text style={styles.detail}>📎 CV: {item.cvName || "Nepoznat fajl"}</Text>
            <Text style={styles.date}>
              🕒 Prijavljeno:{" "}
              {item.appliedAt
                ? new Date(item.appliedAt.seconds * 1000).toLocaleString("sr-RS")
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
  cardHeader: {
    marginBottom: 8,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#274E6D",
  },
  company: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#5B8DB8",
    marginTop: 2,
  },
  detail: {
    fontSize: 14,
    color: "#274E6D",
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    color: "#777",
    marginTop: 4,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  noAppsText: {
    fontSize: 16,
    color: "gray",
  },
});

export default WorkerApplicationsScreen;
