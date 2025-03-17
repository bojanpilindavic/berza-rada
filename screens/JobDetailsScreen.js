import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { getAuth } from "firebase/auth";

const JobDetailsScreen = ({ route, navigation }) => {
  const { job } = route.params;
  const auth = getAuth();
  const user = auth.currentUser; // Provera da li je korisnik prijavljen

  return (
    <View style={styles.container}>
      <Image source={{ uri: job.logo }} style={styles.logo} />
      <Text style={styles.firma}>{job.firma}</Text>
      <Text style={styles.pozicija}>{job.position}</Text>
      <Text style={styles.opstina}>📍 {job.location}</Text>
      <Text style={styles.konkurs}>⏳ Konkurs otvoren do: {job.deadline}</Text>
      <Text style={styles.brojPozicija}>👥 Broj pozicija: {job.numberPosition}</Text>
      
      {/* Dugme za prijavu */}
      <TouchableOpacity
        style={styles.applyButton}
        onPress={() => {
          if (user) {
            navigation.navigate("ApplyScreen", { job });
          } else {
            navigation.navigate("LoginScreen");
          }
        }}
      >
        <Text style={styles.applyButtonText}>Prijavi se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "white",
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
    objectFit: "contain",
  },
  firma: {
    fontSize: 18,
    fontWeight: "bold",
  },
  pozicija: {
    fontSize: 16,
    color: "gray",
  },
  opstina: {
    marginTop: 5,
  },
  konkurs: {
    marginTop: 5,
  },
  brojPozicija: {
    marginTop: 5,
  },
  applyButton: {
    marginTop: 20,
    padding: 12,
    backgroundColor: "#007bff",
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  applyButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default JobDetailsScreen;