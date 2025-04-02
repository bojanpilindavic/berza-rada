import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

const CategoryJobsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { category } = route.params;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = getFirestore();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const q = query(
          collection(db, "jobs"),
          where("category", "==", category)
        );
        const querySnapshot = await getDocs(q);
        const jobsList = [];
        querySnapshot.forEach((doc) => {
          jobsList.push({ id: doc.id, ...doc.data() });
        });
        setJobs(jobsList);
      } catch (error) {
        console.error("Greška pri učitavanju poslova:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [category]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.jobItem}
      onPress={() => navigation.navigate("JobDetailsScreen", { job: item })}
    >
      <Text style={styles.jobTitle}>{item.position}</Text>
      <Text style={styles.companyName}>{item.companyName}</Text>
      <Text style={styles.municipality}>{item.municipality}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Kategorija: <Text style={{ fontWeight: "bold" }}>{category}</Text>
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
      ) : jobs.length === 0 ? (
        <Text style={styles.noJobsText}>Nema oglasa za ovu kategoriju.</Text>
      ) : (
        <FlatList
          data={jobs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 18,
    marginBottom: 16,
  },
  jobItem: {
    padding: 16,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    marginBottom: 12,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  companyName: {
    fontSize: 14,
    marginTop: 4,
  },
  municipality: {
    fontSize: 13,
    marginTop: 2,
    color: "gray",
  },
  noJobsText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    color: "gray",
  },
});

export default CategoryJobsScreen;
