import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const Contact = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Kontakt</Text>

      <Text style={styles.text}>
        Ako imate bilo kakva pitanja, sugestije ili probleme prilikom korišćenja aplikacije, slobodno nas kontaktirajte.
      </Text>

      <Text style={styles.text}>
        📧 Email: podrška@berzarada.com
      </Text>

      <Text style={styles.text}>
        📞 Telefon: +387 61 123 456
      </Text>

      <Text style={styles.text}>
        📍 Adresa: Ulica Primjera 12, 71000 Sarajevo, Bosna i Hercegovina
      </Text>

      <Text style={styles.text}>
        Radno vrijeme korisničke podrške: Ponedeljak – Petak od 09:00 do 17:00
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#B6D8F7",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#274E6D",
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 15,
    lineHeight: 24,
  },
});

export default Contact;
