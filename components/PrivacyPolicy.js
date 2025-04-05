import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const PrivacyPolicy = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Politika privatnosti</Text>

      <Text style={styles.subtitle}>1. Uvod</Text>
      <Text style={styles.text}>
        Ova aplikacija prikuplja određene podatke korisnika u svrhu omogućavanja funkcionalnosti i poboljšanja korisničkog iskustva. Vaši podaci neće biti deljeni sa trećim licima bez vašeg pristanka, osim ako to zakon zahteva.
      </Text>

      <Text style={styles.subtitle}>2. Podaci koji se prikupljaju</Text>
      <Text style={styles.text}>
        Prikupljamo podatke koje korisnici sami unesu prilikom korišćenja aplikacije, uključujući ime, email adresu, tip korisnika (poslodavac ili tražilac posla), poruke, kao i dokumente kao što su biografije (CV) koje korisnici otpremaju.
      </Text>

      <Text style={styles.subtitle}>3. Način prikupljanja i čuvanja podataka</Text>
      <Text style={styles.text}>
        Podaci se prikupljaju isključivo putem formulara unutar aplikacije i čuvaju se u okviru Firebase servisa (Firestore i Firebase Storage). Firebase je bezbedna platforma koja koristi enkripciju i druge sigurnosne standarde.
      </Text>

      <Text style={styles.subtitle}>4. Kako koristimo vaše podatke</Text>
      <Text style={styles.text}>
        Vaši podaci se koriste za povezivanje poslodavaca i tražilaca posla, prikazivanje oglasa, omogućavanje prijava na oglase i prikaz informacija unutar korisničkog profila. CV dokumenti su dostupni samo poslodavcima na čije oglase se korisnik prijavi.
      </Text>

      <Text style={styles.subtitle}>5. Sigurnost podataka</Text>
      <Text style={styles.text}>
        Primenićemo sve razumno potrebne tehničke i organizacione mere kako bismo zaštitili vaše podatke od neovlašćenog pristupa, otkrivanja ili zloupotrebe.
      </Text>

      <Text style={styles.subtitle}>6. Prava korisnika</Text>
      <Text style={styles.text}>
        U svakom trenutku imate pravo da zatražite uvid, ispravku ili brisanje svojih podataka. Kontaktirajte nas putem opcije "Kontakt" u aplikaciji ili putem email adrese dostupne u sekciji pomoći.
      </Text>

      <Text style={styles.subtitle}>7. Maloletni korisnici</Text>
      <Text style={styles.text}>
        Aplikacija nije namenjena osobama mlađim od 16 godina. Ne prikupljamo svesno podatke od maloletnih lica. Ako verujete da je dete dostavilo lične podatke, molimo vas da nas kontaktirate kako bismo uklonili te podatke.
      </Text>

      <Text style={styles.subtitle}>8. Saglasnost</Text>
      <Text style={styles.text}>
        Korišćenjem ove aplikacije, pristajete na uslove ove politike privatnosti. Zadržavamo pravo izmene ove politike, o čemu ćete biti blagovremeno obavešteni putem aplikacije.
      </Text>
    </ScrollView>
  );
};

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
