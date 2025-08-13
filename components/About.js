import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const About = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>O aplikaciji “Berza rada”</Text>

      <Text style={styles.paragraph}>
        Aplikacija “Berza rada” je nastala u okviru projekta „Podrška Evropske
        unije lokalnim partnerstvima za zapošljavanje – Faza II“ (LEP II – Local
        Employment Partnership) „Korak do posla“ koji realizuje Lokalno
        partnerstvo za zapošljavanje (LPZ) Istočno Sarajevo čiji je glavni
        nosilac Gradska razvojna agencija-RAIS.
      </Text>

      <Text style={styles.paragraph}>
        Pored RAIS-a na projektu učestvuje još osam partnerskih organizacija i
        institucija: Agencija za razvoj preduzeća Eda Banja Luka, Grad Istočno
        Sarajevo, Opština Istočno Novo Sarajevo, Opština Istočna Ilidža, JU
        Zavod za zapošljavanje Republike Srpske, Mašinski fakultet Univerziteta
        u Istočnom Sarajevu, Eko Željeznica d.o.o. Istočna Ilidža i Zlatno Zrno
        sp Istočno Novo Sarajevo.
      </Text>

      <Text style={styles.paragraph}>
        Cilj projekta koji će trajati 21 mjesec je smanjenje nezaposlenosti kroz
        povećanje kvalifikacija i uspješnu integraciju nezaposlenih, sa posebnim
        osvrtom na teže zapošljive kategorije, radi stvaranja održivijeg i
        inkluzivnijeg tržišta rada.
      </Text>

      <Text style={styles.paragraph}>
        Do 2026. godine se očekuje manje od 4000 nezaposlenih na području grada
        Istočno Sarajevo. Ishod projekta biće udruženi i kontinuirani rad svih
        učesnika na tržištu rada na realizaciji inicijativa u cilju usklađivanja
        ponude i tražnje na tržištu rada.
      </Text>

      <Text style={styles.paragraph}>
        Lokalno partnerstvo za zapošljavanje Istočno Sarajevo je jedno od 26
        partnerstava uspostavljenih u BiH u okviru projekta “Podrška Evropske
        unije lokalnim partnerstvima za zapošljavanje – Faza II” (LEP II), kojeg
        Evropska unija finansira s 6 miliona eura, a provodi Međunarodna
        organizacija rada.
      </Text>

      <Text style={styles.paragraph}>
        Ovaj projekat ima za cilj da kroz lokalna partnerstva za zapošljavanje
        doprinese poboljšanju zapošljavanja u lokalnim zajednicama i unaprijedi
        vještine i prilike za zapošljavanje osoba u nepovoljnom položaju na
        tržištu rada.
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#1B3A57",
    marginBottom: 20,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    color: "#1B1B1B",
    marginBottom: 16,
    lineHeight: 24,
    textAlign: "justify",
  },
});

export default About;
