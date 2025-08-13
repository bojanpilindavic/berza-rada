// screens/AdminHome.js

import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  StatusBar
} from "react-native";
import Footer from "../components/Footer";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";
import AdminHeader from "../components/AdminHeader";

const AdminHome = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const db = getFirestore();
  const user = getAuth().currentUser;

  useEffect(() => {
    (async () => {
      try {
        const snapshot = await getDocs(collection(db, "jobs"));
        setJobs(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
      } catch (e) {
        console.error("Greška pri učitavanju oglasa:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleDelete = (jobId) => {
    Alert.alert(
      "Potvrda brisanja",
      "Želite li obrisati ovaj oglas?",
      [
        { text: "Otkaži", style: "cancel" },
        {
          text: "Obriši",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, "jobs", jobId));
              setJobs(current => current.filter(j => j.id !== jobId));
              Alert.alert("Obrisano", "Oglas je uspješno obrisan.");
            } catch (e) {
              console.error("Greška pri brisanju oglasa:", e);
              Alert.alert("Greška", "Brisanje oglasa nije uspelo.");
            }
          }
        }
      ]
    );
  };

  // renderuje se pre nego što imamo podatke
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AdminHeader />
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#5B8DB8" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={jobs}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <>
            <AdminHeader />
            <View style={styles.container}>
              <Text style={styles.header}>🛠️ Admin Panel</Text>
              <Text style={styles.subtitle}>Ulogovani: {user?.email}</Text>
            </View>
          </>
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.title}>{item.position}</Text>
              <Text style={styles.company}>{item.companyName}</Text>
            </View>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteText}>Obriši</Text>
            </TouchableOpacity>
          </View>
        )}
        ListFooterComponent={() => <Footer />}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight
  },
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: "#fff"
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#274E6D",
    marginBottom: 4
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    marginBottom: 12
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFE3",
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 10,
    elevation: 1
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#274E6D"
  },
  company: {
    fontSize: 14,
    color: "#5B8DB8",
    marginTop: 2
  },
  deleteText: {
    color: "#C00",
    fontWeight: "bold"
  }
});

export default AdminHome;
