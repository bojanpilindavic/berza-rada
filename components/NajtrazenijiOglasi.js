import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, query, limit, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const NajtrazenijiOglasi = () => {
  const navigation = useNavigation();
  const [oglasi, setOglasi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const q = query(collection(db, "jobs"), limit(5));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setOglasi(data);
      } catch (err) {
        console.error("❌ Greška pri učitavanju oglasa:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5B8DB8" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Najpopularniji oglasi</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {oglasi.map((oglas) => (
          <TouchableOpacity
            key={oglas.id}
            style={styles.card}
            onPress={() => navigation.navigate("JobDetailsScreen", { job: oglas })}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.firma}>{oglas.companyName}</Text>
              {oglas.logo && <Image source={{ uri: oglas.logo }} style={styles.logo} />}
            </View>
            <Text style={styles.position}>{oglas.position}</Text>
            <Text style={styles.location}>📍 {oglas.municipality}</Text>
            <Text style={styles.deadline}>⏳ {oglas.endDate}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
    backgroundColor: "#F0F0F0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#274E6D",
  },
  card: {
    width: 220,
    backgroundColor: '#75D5C2',
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  firma: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#274E6D",
    flex: 1,
    paddingRight: 5,
  },
  position: {
    fontSize: 14,
    fontWeight: "600",
    color: "#274E6D",
    marginTop: 5,
  },
  location: {
    fontSize: 13,
    color: "#555",
  },
  deadline: {
    fontSize: 13,
    color: "#777",
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 6,
    marginLeft: 5,
  },
  loadingContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
});

export default NajtrazenijiOglasi;
