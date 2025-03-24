import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const TermsOfService = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Uslovi korišćenja</Text>

      <Text style={styles.subtitle}>1. Opšti uslovi</Text>
      <Text style={styles.text}>
        Korišćenjem ove aplikacije, saglasni ste sa sledećim uslovima:
      </Text>

      <Text style={styles.subtitle}>2. Povezivanje poslodavaca i posloprimaca</Text>
      <Text style={styles.text}>
        Aplikacija je namenjena isključivo za povezivanje poslodavaca i
        posloprimaca. Korišćenje aplikacije u bilo koje druge svrhe je zabranjeno.
      </Text>

      <Text style={styles.subtitle}>3. Obaveza tačnosti informacija</Text>
      <Text style={styles.text}>
        Nije dozvoljeno objavljivanje lažnih, obmanjujućih ili neautentičnih
        informacija na platformi. Svaka obmana može dovesti do suspenzije naloga.
      </Text>

      <Text style={styles.subtitle}>4. Zabrane i sankcije</Text>
      <Text style={styles.text}>
        Zadržavamo pravo da suspendujemo naloge koji krše ova pravila i uslove.
        Korisnici koji prekrše pravilnik mogu biti trajno isključeni sa platforme.
      </Text>

      <Text style={styles.subtitle}>5. Privatnost i sigurnost</Text>
      <Text style={styles.text}>
        Vaša privatnost je vrlo važna. Informacije koje pružate u aplikaciji biće
        korišćene u skladu sa našom Politikom privatnosti.
      </Text>

      <Text style={styles.text}>
        Ako imate bilo kakvih pitanja ili nedoumica u vezi sa uslovima korišćenja,
        slobodno nas kontaktirajte putem kontakt forme u aplikaciji.
      </Text>
    </ScrollView>
  );
};

// 📌 **STILOVI**
const styles ={
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007bff",
    marginBottom: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#555",
    marginBottom: 15,
    lineHeight: 24,
  },
};

export default TermsOfService;
