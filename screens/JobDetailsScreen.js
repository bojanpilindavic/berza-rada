import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { getAuth } from "firebase/auth";

const JobDetailsScreen = ({ route, navigation }) => {
  const { job } = route.params;
  const auth = getAuth();
  const user = auth.currentUser;
  const employer = job.userId;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {job.logo && <Image source={{ uri: job.logo }} style={styles.logo} />}

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
            navigation.navigate("ApplyScreen", {
              jobId: job.id,
              uid: user.uid,
              employer
            });
          } else {
            navigation.navigate("LoginScreen");
          }
        }}
      >
        <Text style={styles.applyButtonText}>📨 Prijavi se</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#e6f0fa",
    flexGrow: 1,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 15,
    borderRadius: 10,
    resizeMode: "contain",
  },
  company: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "#274E6D",
  },
  position: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    color: "#274E6D",
  },
  location: {
    textAlign: "center",
    marginTop: 5,
    color: "#555",
  },
  deadline: {
    textAlign: "center",
    marginTop: 5,
    color: "#555",
  },
  positions: {
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
    color: "#555",
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
    color: "#274E6D",
  },
  text: {
    fontSize: 15,
    color: "#333",
    marginBottom: 15,
    lineHeight: 22,
  },
  applyButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#5B8DB8",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 40,
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default JobDetailsScreen;
