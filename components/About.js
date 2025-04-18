import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const About = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>O nama</Text>

      <Text style={styles.text}>
        Aplikacija "Berza rada" je platforma koja povezuje poslodavce i tražioce posla na jednostavan i efikasan način. Naša misija je da olakšamo proces zapošljavanja, smanjimo nezaposlenost i omogućimo lokalnim zajednicama bržu i sigurniju razmenu ponuda i potražnje za radnim mestima.
      </Text>

      <Text style={styles.text}>
        Bilo da tražite posao ili želite da zaposlite nove radnike, na pravom ste mestu. Naš tim radi svakodnevno kako bi unapredio funkcionalnosti i pružio korisnicima najbolje moguće iskustvo.
      </Text>

      <Text style={styles.text}>
        Hvala vam na poverenju i što ste deo naše zajednice!
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

export default About;
