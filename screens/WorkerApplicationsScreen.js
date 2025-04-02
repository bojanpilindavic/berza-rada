import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";

const WorkerApplicationsScreen = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = getFirestore();

  console.log("aplikacije",applications)
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const currentUser = auth.currentUser;
        console.log("userr r",currentUser)
        if (!currentUser) return;

        const q = query(
          collection(db, "applications"),
          where("uid", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);

        const apps = [];

        for (const docSnap of querySnapshot.docs) {
          const appData = docSnap.data();
          const jobRef = doc(db, "jobs", appData.jobId); // assuming "jobs" kolekcija
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
        <Text>Nemate nijednu prijavu.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={applications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.job?.title || "Nepoznat oglas"}</Text>
            <Text style={styles.firm}>Firma: {item.job?.companyName || "N/A"}</Text>
            <Text>Vaša poruka: {item.message}</Text>
            <Text>CV: {item.cvName}</Text>
            <Text>Prijavljeno: {new Date(item.appliedAt.seconds * 1000).toLocaleString()}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: "#f2f2f2",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  firm: {
    marginBottom: 6,
    fontStyle: "italic",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default WorkerApplicationsScreen;
