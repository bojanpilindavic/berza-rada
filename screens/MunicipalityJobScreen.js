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

const MunicipalityJobScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { municipality } = route.params;

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = getFirestore();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const q = query(
          collection(db, "jobs"),
          where("municipality", "==", municipality)
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
  }, [municipality]);

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
      <Text style={styles.category}>📂 Kategorija: {item.category || "Nepoznato"}</Text>
      <Text style={styles.deadline}>⏳ Konkurs otvoren do: {item.endDate || "Nepoznato"}</Text>
      <Text style={styles.numberPosition}>
        👥 Broj slobodnih pozicija: {item.numberOfPositions || "Nepoznato"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Opština: <Text style={{ fontWeight: "bold" }}>{municipality}</Text>
      </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#5B8DB8" style={{ marginTop: 20 }} />
      ) : jobs.length === 0 ? (
        <Text style={styles.noJobsText}>Nema oglasa za ovu opštinu.</Text>
      ) : (
        <FlatList
          data={jobs}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 40 }}
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
    backgroundColor: "#F0F0F0",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#274E6D",
  },
  noJobsText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#555",
  },
  card: {
    backgroundColor: "#FFFFE3",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#5B8DB8",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
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
    color: "#274E6D",
    flex: 1,
    flexWrap: "wrap",
    paddingRight: 10,
  },
  position: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#274E6D",
    marginBottom: 5,
  },
  category: {
    fontSize: 14,
    color: "#5B8DB8",
    marginBottom: 3,
  },
  deadline: {
    fontSize: 13,
    color: "#5B8DB8",
    marginBottom: 3,
  },
  numberPosition: {
    fontSize: 13,
    color: "#5B8DB8",
    marginBottom: 10,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 10,
    resizeMode: "contain",
  },
});

export default MunicipalityJobScreen;
