import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Linking } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { getAuth } from "firebase/auth";
import * as WebBrowser from 'expo-web-browser';

const openCV = (uri) => {
  WebBrowser.openBrowserAsync(uri).catch(err => console.error("Greška pri otvaranju CV-a", err));
};


const EmployerApplicationsScreen = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) return;

        // 📌 Prvo dohvati sve oglase koje je objavio poslodavac
        const jobsQuery = query(
          collection(db, "jobs"),
          where("userId", "==", currentUser.uid) // 🔥 Pronalaženje poslova poslodavca
        );
        
        const jobsSnapshot = await getDocs(jobsQuery);

        const jobIds = jobsSnapshot.docs.map((doc) => doc.id);
        console.log("bog te jebo",jobIds)


        if (jobIds.length === 0) {
          setApplications([]); // Poslodavac nema oglase, nema ni prijava
          setLoading(false);
          return;
        }

        // 📌 Sada dohvati prijave koje su podnete na ove oglase
        const appsQuery = query(
          collection(db, "applications"),
          where("employerId", "==", currentUser.uid) // 🔥 Filtriramo prijave po employerId
        );

        const appsSnapshot = await getDocs(appsQuery);

        const data = appsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setApplications(data);
      } catch (error) {
        console.error("Greška pri dohvatanju prijava:", error);
      } finally {
        setLoading(false);
      }
    };
    
    

    fetchApplications();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 20 }} />;
  }

  const openCV = (uri) => {
    Linking.openURL(uri).catch(err => console.error("Greška pri otvaranju CV-a", err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prijave na vaše oglase</Text>
      {applications.length === 0 ? (
        <Text style={styles.empty}>Nema prijava.</Text>
      ) : (
        <FlatList
          data={applications}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.email}</Text>
              <Text>{item.message || "Bez poruke"}</Text>
              <Text style={styles.cv} onPress={() => openCV(item.cvUri)}>📄 {item.cvName}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12
  },
  empty: {
    textAlign: "center",
    marginTop: 50,
    color: "gray"
  },
  card: {
    padding: 14,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
    marginBottom: 10
  },
  name: {
    fontSize: 16,
    fontWeight: "bold"
  },
  cv: {
    color: "#007bff",
    marginTop: 5
  }
});

export default EmployerApplicationsScreen;
