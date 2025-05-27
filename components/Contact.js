import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const Contact = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Kontakt</Text>

      <Text style={styles.textTitle}>
      Biro Istočno Novo Sarajevo
      </Text>

      <Text style={styles.text}>
        📧 Email: biro.insarajevo@fis.zzzrs.net
      </Text>

      <Text style={styles.text}>
        📞 Telefon: 057 / 344 – 261

      </Text>

      <Text style={styles.text}>
        📍 Adresa: Spasovdanska 23, 71123 Istočno Sarajevo

      </Text>

      <Text style={styles.textTitle}>
      Biro Istočna Ilidža      </Text>

      <Text style={styles.text}>
        📧 Email: biro.iilidza@fis.zzzrs.net
      </Text>

      <Text style={styles.text}>
        📞 Telefon: 057 / 344 – 262

      </Text>

      <Text style={styles.text}>
        📍 Adresa: Dabrobosanska 26, 71123 Istočna Ilidža


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
    color: "#274E6D",
    marginBottom: 15,
    lineHeight: 24,
  },
  textTitle: {
    fontSize: 16,
    color: "#274E6D",
    marginBottom: 15,
    lineHeight: 24,
    fontWeight: "bold",

  },
});

export default Contact;
