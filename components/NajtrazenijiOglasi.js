// NajtrazenijiOglasi.js

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
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
        const q = query(collection(db, "adminJobs"), limit(5));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
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
      <Text style={styles.title}>Oglasi javnih institucija</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {oglasi.map((oglas) => (
          <View key={oglas.id} style={styles.card}>
            {/* Poslodavac */}
            <Text style={styles.employer} numberOfLines={1}>
              {oglas.employer}
            </Text>

            {/* Opština */}
            <View style={styles.row}>
              <Text style={styles.label}>📍</Text>
              <Text style={styles.value} numberOfLines={1}>
                {oglas.municipality}
              </Text>
            </View>

            {/* Rok za konkurs */}
            <View style={styles.row}>
              <Text style={styles.label}>⏳</Text>
              <Text style={styles.value} numberOfLines={1}>
                {oglas.endDate}
              </Text>
            </View>

            {/* Link kao klikabilan tekst */}
            {oglas.link ? (
              <TouchableOpacity
                onPress={() => Linking.openURL(oglas.link)}
                style={styles.linkContainer}
              >
                <Text style={styles.linkText} numberOfLines={1}>
                  🔗 Pogledaj link
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 8,
    backgroundColor: "#F0F0F0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
    color: "#274E6D",
  },
  card: {
    width: 200, // fiksna širina kartice
    backgroundColor: "#94D8CA",
    padding: 10, // smanjen padding
    borderRadius: 8,
    marginRight: 8, // manji razmak između kartica
    elevation: 2,
  },
  employer: {
    fontSize: 16, // smanjen font
    fontWeight: "bold",
    color: "#274E6D",
    marginBottom: 6, // manja margina ispod
    textAlign: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  label: {
    fontSize: 12, // manji font za ikonicu
    marginRight: 4,
  },
  value: {
    fontSize: 12, // manji font za tekst
    color: "#333",
    flexShrink: 1, // da tekst ne rasteže karticu
  },
  linkContainer: {
    marginTop: 4,
  },
  linkText: {
    fontSize: 12, // manja veličina fonta
    color: "#274E6D",
    textDecorationLine: "underline",
  },
  loadingContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
});

export default NajtrazenijiOglasi;
