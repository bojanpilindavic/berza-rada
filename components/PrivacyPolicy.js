import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Politika privatnosti</Text>

      <Text style={styles.subtitle}>1. Uvod</Text>
      <Text style={styles.text}>
        Ova aplikacija prikuplja određene podatke korisnika kako bi poboljšala
        korisničko iskustvo. Vaši podaci neće biti deljeni sa trećim licima
        bez vašeg pristanka.
      </Text>

      <Text style={styles.subtitle}>2. Podaci koji se prikupljaju</Text>
      <Text style={styles.text}>
        Prikupljamo informacije kao što su ime, email adresa i podaci vezani za
        oglase koje kreirate ili na koje se prijavljujete.
      </Text>

      <Text style={styles.subtitle}>3. Kako koristimo vaše podatke</Text>
      <Text style={styles.text}>
        Podaci koji se prikupljaju koriste se isključivo u svrhu poboljšanja
        funkcionalnosti aplikacije i vašeg korisničkog iskustva. Nikada nećemo
        deliti vaše podatke sa trećim stranama bez vašeg izričitog pristanka.
      </Text>

      <Text style={styles.subtitle}>4. Sigurnost podataka</Text>
      <Text style={styles.text}>
        Vaši podaci će biti zaštićeni na odgovarajući način kako bi se
        sprečila neovlašćena upotreba ili pristup. Preduzimamo sve
        tehničke i organizacione mere kako bismo obezbedili sigurnost vaših
        podataka.
      </Text>

      <Text style={styles.subtitle}>5. Prava korisnika</Text>
      <Text style={styles.text}>
        Kao korisnik imate pravo da zahtevate pristup, ispravku, ili brisanje
        svojih ličnih podataka u svakom trenutku. Kontaktirajte nas putem
        kontakt forme u aplikaciji za više informacija.
      </Text>

      <Text style={styles.text}>
        Korišćenjem ove aplikacije, pristajete na uslove naše politike
        privatnosti.
      </Text>
    </ScrollView>
  );
};

// 📌 **STILOVI**
const styles = {
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

export default PrivacyPolicy;
