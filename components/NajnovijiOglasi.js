import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const NajnovijiOglasi = () => {
  const navigation = useNavigation();
  const [oglasi, setOglasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [lastVisible, setLastVisible] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchJobs = async (pagination = false, isRefresh = false) => {
    try {
      let q = query(
        collection(db, "jobs"),
        orderBy("createdAt", "desc"),
        limit(7)
      );

      if (pagination && lastVisible) {
        q = query(
          collection(db, "jobs"),
          orderBy("createdAt", "desc"),
          startAfter(lastVisible),
          limit(7)
        );
      }

      const querySnapshot = await getDocs(q);
      const jobsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (pagination) {
        setOglasi((prevOglasi) => [...prevOglasi, ...jobsData]);
      } else {
        setOglasi(jobsData);
      }

      const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(lastVisibleDoc || null);

      console.log("🔁 Oglasi učitani:", jobsData.length);
    } catch (error) {
      console.error("❌ Greška prilikom preuzimanja oglasa:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
      if (isRefresh) setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      setLastVisible(null); // Resetujemo lastVisible pri novom fokusu
      fetchJobs();
    }, [])
  );

  const handleRefresh = () => {
    console.log("🔄 Ručno osvežavanje...");
    setRefreshing(true);
    setLastVisible(null); // Resetuj paginaciju pri refreshu
    fetchJobs(false, true);
  };

  const loadMore = () => {
    if (!loadingMore && lastVisible) {
      setLoadingMore(true);
      fetchJobs(true);
    }
  };

  if (loading && !refreshing) {
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
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
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
    backgroundColor: "#F0F0F0",

  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#274E6D"
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  firma: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#274E6D"

  },
  position: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 5,
    color: "#274E6D"

  },
  location: {
    fontSize: 14,
    color: "#555",
    marginBottom: 3,
    color: "#274E6D"

  },
  deadline: {
    fontSize: 13,
    color: "#777",
    marginBottom: 3,
    color: "#274E6D"

  },
  numberPosition: {
    fontSize: 13,
    color: "#777",
    marginBottom: 10,
    color: "#274E6D"

  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 10,
    objectFit: "contain",
  },
  loadMoreButton: {
    backgroundColor: "#5B8DB8",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 40,
  },
  loadMoreText: {
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NajnovijiOglasi;
