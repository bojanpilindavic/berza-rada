import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const TermsOfService = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Uslovi korišćenja</Text>

      <Text style={styles.subtitle}>1. Uvod</Text>
      <Text style={styles.text}>
        Korišćenjem ove aplikacije prihvatate sledeće uslove korišćenja. Ukoliko se ne slažete sa uslovima, molimo vas da ne koristite aplikaciju.
      </Text>

      <Text style={styles.subtitle}>2. Svrha aplikacije</Text>
      <Text style={styles.text}>
        Ova aplikacija služi za povezivanje poslodavaca i osoba koje traže posao. Korišćenje aplikacije u bilo koje druge svrhe (npr. spam, prevare, ili zloupotreba podataka) strogo je zabranjeno.
      </Text>

      <Text style={styles.subtitle}>3. Registracija i korisnički nalozi</Text>
      <Text style={styles.text}>
        Prilikom registracije ste u obavezi da unesete tačne i potpune podatke. Vi ste odgovorni za sve aktivnosti koje se obavljaju preko vašeg naloga. U slučaju sumnjivih aktivnosti, zadržavamo pravo da privremeno ili trajno suspendujemo vaš nalog.
      </Text>

      <Text style={styles.subtitle}>4. Obaveze korisnika</Text>
      <Text style={styles.text}>
        Korisnici ne smeju da objavljuju netačne, obmanjujuće ili uvredljive informacije. Zabranjeno je postavljanje nezakonitih sadržaja, kao i bilo kakvo ponašanje koje narušava prava drugih korisnika.
      </Text>

      <Text style={styles.subtitle}>5. Sadržaj koji delite</Text>
      <Text style={styles.text}>
        Vi ste odgovorni za sav sadržaj koji postavljate putem aplikacije, uključujući tekstualne informacije, oglase, poruke i dokumente (npr. biografije). Aplikacija ne preuzima odgovornost za tačnost ili zakonitost tog sadržaja.
      </Text>

      <Text style={styles.subtitle}>6. Privatnost</Text>
      <Text style={styles.text}>
        Vaša privatnost je važna. Informacije koje delite u aplikaciji koriste se u skladu sa našom <Text style={{fontWeight: "bold"}}>Politikom privatnosti</Text>, koja je dostupna unutar aplikacije.
      </Text>

      <Text style={styles.subtitle}>7. Ograničenje odgovornosti</Text>
      <Text style={styles.text}>
        Aplikacija ne garantuje uspešnost pronalaska zaposlenja niti odgovara za ponašanje drugih korisnika. Korisnici prihvataju korišćenje aplikacije na sopstvenu odgovornost.
      </Text>

      <Text style={styles.subtitle}>8. Izmene uslova</Text>
      <Text style={styles.text}>
        Zadržavamo pravo izmene ovih uslova korišćenja u bilo kom trenutku. Korisnici će o važnim izmenama biti obavešteni putem aplikacije. Nastavak korišćenja aplikacije nakon izmena smatraće se prihvatanjem novih uslova.
      </Text>

      <Text style={styles.subtitle}>9. Kontakt</Text>
      <Text style={styles.text}>
        Za sva pitanja ili pritužbe u vezi sa korišćenjem aplikacije, možete nas kontaktirati putem opcije "Kontakt" unutar aplikacije.
      </Text>

      <Text style={styles.text}>
        Poslednje ažuriranje: April 2025.
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

export default TermsOfService;
