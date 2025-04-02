import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs, query, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const NajnovijiOglasi = () => {
  const navigation = useNavigation();
  const [oglasi, setOglasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState(null);  // Čuva poslednji učitani oglas
  const [loadingMore, setLoadingMore] = useState(false);  // Za loading indikator kad se učitava još

  const fetchJobs = async (pagination) => {
    try {
      let q = query(collection(db, "jobs"), orderBy("createdAt", "desc"), limit(7));  // Prvih 7 oglasa
      if (pagination && lastVisible) {
        q = query(collection(db, "jobs"), orderBy("createdAt", "desc"), startAfter(lastVisible), limit(7));
      }
      
      const querySnapshot = await getDocs(q);
      const jobsData = [];
      querySnapshot.forEach((doc) => {
        jobsData.push({ id: doc.id, ...doc.data() });
      });

      if (pagination) {
        setOglasi((prevOglasi) => [...prevOglasi, ...jobsData]);
      } else {
        setOglasi(jobsData);
      }

      // Čuvanje poslednjeg vidljivog dokumenta za paginaciju
      const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(lastVisibleDoc);
    } catch (error) {
      console.error("❌ Greška prilikom preuzimanja oglasa:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchJobs(); // Poziv za učitavanje prvih 7 oglasa
  }, []);

  const loadMore = () => {
    setLoadingMore(true);
    fetchJobs(true); // Poziv za učitavanje sledećih 7 oglasa
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Učitavanje oglasa...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Najnoviji oglasi</Text>
      <ScrollView>
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
            <Text style={styles.deadline}>⏳ Konkurs otvoren do: {oglas.endDate}</Text>
            <Text style={styles.numberPosition}>👥 Broj slobodnih pozicija: {oglas.numberOfPositions}</Text>
          </TouchableOpacity>
        ))}
        {loadingMore && (
          <ActivityIndicator size="large" color="#add8e6" style={{ marginTop: 20 }} />     

        )}
        {!loadingMore && lastVisible && (
          <TouchableOpacity onPress={loadMore} style={styles.loadMoreButton}>
            <Text style={styles.loadMoreText}>Učitaj još</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
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
    objectFit: 'contain',
  },
  loadMoreButton: {
    backgroundColor: "#add8e6",

    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 40,
  },
  loadMoreText: {
    fontWeight: "bold",
    color: "#000",
    
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NajnovijiOglasi;
