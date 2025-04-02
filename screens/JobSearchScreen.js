import { db } from "../firebase/firebaseConfig";

import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

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

        // Filtriranje oglasa uz provere da li postoje potrebna polja
        const filteredJobs = allJobs.filter(
          (job) =>
            job.position?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.municipality?.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setJobs(filteredJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
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
            <TouchableOpacity style={styles.card}>
              <Text style={styles.jobTitle}>{item.position || "Nepoznata pozicija"}</Text>
              <Text style={styles.company}>{item.companyName || "Nepoznata firma"}</Text>
              <Text style={styles.description} numberOfLines={2}>
                {item.description || "Nema opisa"}
              </Text>
              <Text style={styles.location}>{item.municipality || "Nepoznata lokacija"}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 10 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  noResults: { textAlign: "center", fontSize: 16, color: "gray" },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  jobTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  company: { fontSize: 14, color: "#666", marginBottom: 5 },
  description: { fontSize: 14, color: "#333", marginBottom: 5 },
  location: { fontSize: 12, color: "#007bff", fontWeight: "bold" },
});

export default JobScreen;
