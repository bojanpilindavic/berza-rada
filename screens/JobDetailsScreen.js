import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { getAuth } from "firebase/auth";

const JobDetailsScreen = ({ route, navigation }) => {
  const { job } = route.params;
  const auth = getAuth();
  const user = auth.currentUser;
  console.log("posooo",job.userId)
  const employer = job.userId


  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo ako postoji */}
      {job.logo && (
        <Image source={{ uri: job.logo }} style={styles.logo} />
      )}
      
      <Text style={styles.company}>{job.companyName}</Text>
      <Text style={styles.position}>{job.position}</Text>
      <Text style={styles.location}>📍 {job.municipality}</Text>
      <Text style={styles.deadline}>⏳ Konkurs otvoren do: {job.endDate}</Text>
      <Text style={styles.positions}>👥 Broj pozicija: {job.numberOfPositions}</Text>

      <View style={styles.separator} />

      <Text style={styles.sectionTitle}>Opis posla</Text>
      <Text style={styles.text}>{job.description || "Opis nije unesen."}</Text>

      <Text style={styles.sectionTitle}>Uslovi</Text>
      <Text style={styles.text}>{job.conditions || "Uslovi nisu navedeni."}</Text>

      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => {
          if (user) {
            //navigation.navigate("ApplyScreen", { job });
            navigation.navigate('ApplyScreen', {
              jobId: job.id,
              uid:user,
              employer
            });
          } else {
            navigation.navigate("LoginScreen");
          }
        }}
      >
        <Text style={styles.applyButtonText}>Prijavi se</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 15,
    borderRadius: 8,
  },
  company: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  position: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
    marginBottom: 10,
  },
  location: {
    textAlign: "center",
    marginTop: 5,
  },
  deadline: {
    textAlign: "center",
    marginTop: 5,
  },
  positions: {
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 15,
    color: "#333",
    marginBottom: 15,
  },
  applyButton: {
    marginTop: 20,
    padding: 14,
    backgroundColor: "#007bff",
    borderRadius: 10,
    alignItems: "center",
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default JobDetailsScreen;

