import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";


const oglasi = [
  {
    id: 1,
    company: "EURO PART",
    position: "Radnik u magacinu",
    location: "Istočno Novo Sarajevo",
    deadline: "30.03.2025",
    numberPosition: 3,
    logo: "https://s19538.pcdn.co/wp-content/uploads/2021/08/europart.jpg",
    description : "Opis posla: Tražimo odgovornu i motivisanu osobu za poziciju prodavca kamionskih delova u našem preduzeću. Idealni kandidat će biti zadužen za prodaju, savetovanje kupaca, kao i za obezbeđivanje da se potrebni delovi brzo i efikasno dostave kupcima."
  },
  {
    id: 2,
    company: "XYZ Transport",
    position: "Vozač kamiona",
    location: "Pale",
    deadline: "15.04.2025",
    numberPosition: 2,
    logo: "https://monti-doo.com/Images/Makers/2201571228116-0.jpeg"
  },
  {
    id: 3,
    company: "IT Solutions",
    position: "Programer",
    location: "Istočna Ilidža",
    deadline: "10.04.2025",
    numberPosition: 1,
    logo: "https://via.placeholder.com/50"
  }
];

const NajnovijiOglasi = () => {
  const navigation = useNavigation(); 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Najnoviji oglasi</Text>
      <ScrollView>
        {oglasi.map((oglas) => (
          <TouchableOpacity 
          key={oglas.id} 
          style={styles.card} 
          onPress={() => navigation.navigate("JobDetailsScreen", { job: oglas })} // Klik vodi na detalje oglasa
        >
            <View style={styles.cardHeader}>
              <Text style={styles.firma}>{oglas.company}</Text>
              <Image source={{ uri: oglas.logo }} style={styles.logo} />
            </View>
            <Text style={styles.position}>{oglas.position}</Text>
            <Text style={styles.location}>📍 {oglas.location}</Text>
            <Text style={styles.deadline}>⏳ Konkurs otvoren do: {oglas.deadline}</Text>
            <Text style={styles.numberPosition}>👥 Broj slobodnih pozicija: {oglas.numberPosition}</Text>
          
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
  pozicija: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 5,
  },
  opstina: {
    fontSize: 14,
    color: "#555",
    marginBottom: 3,
  },
  konkurs: {
    fontSize: 13,
    color: "#777",
    marginBottom: 3,
  },
  brojPozicija: {
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
  button: {
    backgroundColor: "#add8e6",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
    color: "#000",
  },
});

export default NajnovijiOglasi;
