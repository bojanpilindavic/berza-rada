import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";

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
    paddingHorizontal: 10,
    marginTop: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  noJobsText: {
    marginTop: 20,
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

export default CategoryJobsScreen;
