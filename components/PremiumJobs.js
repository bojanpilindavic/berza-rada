import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";


const premiumJobs = [
  { id: 1, company: "Firma A", position: "Web Developer", location: "Sarajevo", deadline: "15.03.2025",logo: "https://s19538.pcdn.co/wp-content/uploads/2021/08/europart.jpg",
},
  { id: 2, company: "Firma B", position: "Grafički dizajner", location: "Banja Luka", deadline: "20.03.2025" },
  { id: 3, company: "Firma C", position: "Vozač kamiona", location: "Mostar", deadline: "25.03.2025" },
];

const PremiumJobs = () => {
  const navigation = useNavigation(); 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Premium oglasi</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {premiumJobs.map((job) => (
          <View key={job.id} style={styles.card}>
            <TouchableOpacity key={job.id} onPress={() => navigation.navigate("JobDetailsScreen", { job: job })} >
              <Text style={styles.company}>{job.company}</Text>
              <Text style={styles.text}>🔹 {job.position}</Text>
              <Text style={styles.text}>📍 {job.location}</Text>
              <Text style={styles.text}>📅 Konkurs do {job.deadline}</Text>
            </TouchableOpacity>

          </View>
        ))}
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
  },
  scrollContainer: {
    flexDirection: "row",
  },
  card: {
    width: 200,
    padding: 15,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: "#f8f8f8",
    elevation: 3,
  },
  company: {
    fontSize: 16,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#add8e6",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#000",
  },
});

export default PremiumJobs;
