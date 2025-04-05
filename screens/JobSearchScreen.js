import { db } from "../firebase/firebaseConfig";
import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";

const JobScreen = () => {
  const route = useRoute();
  const searchQuery = route.params?.query || "";
  const navigation = useNavigation();

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsRef = collection(db, "jobs");
        const snapshot = await getDocs(jobsRef);
        const allJobs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        const filteredJobs = allJobs.filter(
          (job) =>
            job.position?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.municipality?.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setJobs(filteredJobs);
      } catch (error) {
        console.error("Greška pri učitavanju poslova:", error);
      }
    };

    fetchJobs();
  }, [searchQuery]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rezultati pretrage: "{searchQuery}"</Text>
      {jobs.length === 0 ? (
        <Text style={styles.noResults}>Nema rezultata.</Text>
      ) : (
        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("JobDetailsScreen", { job: item })}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.firma}>{item.companyName || "Nepoznata firma"}</Text>
                {item.logo && <Image source={{ uri: item.logo }} style={styles.logo} />}
              </View>
              <Text style={styles.position}>{item.position || "Nepoznata pozicija"}</Text>
              <Text style={styles.location}>📍 {item.municipality || "Nepoznata lokacija"}</Text>
              <Text style={styles.deadline}>⏳ Konkurs otvoren do: {item.endDate}</Text>
              <Text style={styles.numberPosition}>
                👥 Broj slobodnih pozicija: {item.numberOfPositions || "Nepoznato"}
              </Text>
            </TouchableOpacity>
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
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  noResults: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
  },
  card: {
    backgroundColor: "#f8f9fa",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  firma: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  position: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: "#555",
    marginBottom: 3,
  },
  deadline: {
    fontSize: 13,
    color: "#777",
    marginBottom: 3,
  },
  numberPosition: {
    fontSize: 13,
    color: "#777",
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 10,
    objectFit: "contain",
  },
});

export default JobScreen;
