import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  console.log("rijsss", searchTerm)

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigation.navigate("JobSearchScreen", { query: searchTerm });
      setSearchTerm("");
    }
  };
  console.log("ovde je", userType)

  const navigation = useNavigation();
  const auth = getAuth();
  const db = getFirestore();

  // Provera da li je korisnik prijavljen i dohvat tipa korisnika
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          setUserType(userDoc.data().userType);
        }
      } else {
        setUserType(null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Funkcija za odjavu
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setProfileMenuVisible(false);
      console.log("Korisnik je odjavljen");
    } catch (error) {
      console.error("Greška prilikom odjave:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Image source={require("../assets/header.png")} style={styles.image} />

      {/* PRVI RED: Hamburger meni + Naziv aplikacije + Ikone */}
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu" size={30} color="black" />
        </TouchableOpacity>
        <Text style={styles.logo}>BERZA RADA</Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color="black" />
          </TouchableOpacity>

          {user ? (
            <TouchableOpacity onPress={() => setProfileMenuVisible(true)}>
              <Ionicons name="person-circle-outline" size={30} color="black" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
              <Ionicons name="log-in-outline" size={24} color="black" />
            </TouchableOpacity>
          )}
        </View>
      </View>
      {/* DRUGI RED: Search bar + Objavi oglas */}
      <View style={styles.bottomContainer}>
        <View
          style={[
            styles.searchContainer,
            !user || userType === "worker" ? { flex: 1 } : null,
          ]}
        >
          <Ionicons name="search" size={20} color="#555" />
          <TextInput
            placeholder="Pretraži oglase..."
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmitEditing={handleSearch} // Pokreće pretragu na Enter
          />
          <Ionicons name="mic" size={20} color="#555" />
        </View>
        {userType === "employer" && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("JobAddScreen")}
          >
            <Text style={styles.buttonText}>+ Objavi oglas</Text>
          </TouchableOpacity>
        )}
        {!user && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.buttonText}>+ Objavi oglas</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* MODAL: Profil meni */}
      <Modal visible={profileMenuVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Moj profil</Text>

            <TouchableOpacity
              onPress={() => {
                setProfileMenuVisible(false);
                navigation.navigate("ProfileScreen");
              }}
            >
              <Text style={styles.menuItem}>👤 Moj profil</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setProfileMenuVisible(false);
                console.log("User type:", userType);
                if (userType === "worker") {
                  navigation.navigate("WorkerApplicationsScreen");
                } else {
                  navigation.navigate("EmployerApplicationsScreen");
                }
              }}
            >
              <Text style={styles.menuItem}>📄 Moje prijave</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.menuItem}>🚪 Odjavi se</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setProfileMenuVisible(false)}>
              <Text style={styles.closeButton}>Zatvori</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL: Hamburger meni */}
      <Modal visible={menuVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {!user && (
              <TouchableOpacity
                onPress={() => navigation.navigate("RegisterScreen")}
              >
                <Text style={styles.menuItem}>📝 Registracija</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                setContactVisible(true);
              }}
            >
              <Text style={styles.menuItem}>📞 Kontakt</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setMenuVisible(false);
                setAboutVisible(true);
              }}
            >
              <Text style={styles.menuItem}>ℹ️ O nama</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setMenuVisible(false)}>
              <Text style={styles.closeButton}>Zatvori</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL: Kontakt */}
      <Modal visible={contactVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Kontakt informacije</Text>
            <Text>Email: kontakt@berzarada.com</Text>
            <Text>Telefon: +387 65 123 456</Text>
            <TouchableOpacity onPress={() => setContactVisible(false)}>
              <Text style={styles.closeButton}>Zatvori</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL: O nama */}
      <Modal visible={aboutVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>O nama</Text>
            <Text>Aplikacija “Berza rada” je nastala u okviru projekta „Podrška Evropske unije lokalnim partnerstvima za zapošljavanje – Faza II“ (LEP II – Local Employment Partnership) sa realizacijom je započeo projekat „Korak do posla“ koji realizuje Lokalno partnerstvo za zapošljavanje (LPZ) Istočno Sarajevo čiji je glavni nosilac Gradska razvojna agencija-RAIS. Pored RAIS-a na projektu učestvuje još osam partnerskih organizacija i institucija. Agencija za razvoj preduzeća Eda Banja Luka, Grad Istočno Sarajevo, Opština Istočno Novo Sarajevo, Opština Istočna Ilidža, JU Zavod za zapošljavanje Republike Srpske, Mašinski fakultet Univerziteta u Istočnom Sarajevu, Eko Željeznica d.o.o. Istočna Ilidža i Zlatno Zrno sp Istočno Novo Sarajevo su partneri na projektu.

              Lokalno partnerstvo za zapošljavanje Istočno Sarajevo je jedno od 26 partnerstava uspostavljenih u BiH u okviru projekta “Podrška Evropske unije lokalnim partnerstvima za zapošljavanje – Faza II” (LEP II), kojeg Evropska unija finansira s 6 miliona eura, a provodi Međunarodna organizacija rada). Ovaj projekat ima za cilj da kroz lokalna partnerstva za zapošljavanje doprinese poboljšanju zapošljavanja u lokalnim zajednicama i unaprijedi vještine i prilike za zapošljavanje osoba u nepovoljnom položaju na tržištu rada.</Text>
            <TouchableOpacity onPress={() => setAboutVisible(false)}>
              <Text style={styles.closeButton}>Zatvori</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
    paddingBottom: 10,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  logo: {
    fontSize: 22,
    fontWeight: "bold",
  },
  iconsContainer: {
    flexDirection: "row",
    gap: 15,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 5,
    marginLeft: 5,
  },
  button: {
    backgroundColor: "#add8e6",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#000",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  menuItem: {
    fontSize: 16,
    padding: 10,
    textAlign: "center",
  },
  image: {
    width: "100%", // Malo smanji širinu da ne bude skroz do ivica ekrana
    height: 90, // Smanji visinu da se bolje uklopi
    resizeMode: "contain", // Održava proporcije slike bez sečenja
    alignSelf: "center", // Centriranje slike
    marginVertical: 10, // Razmak gore-dole
  },
  closeButton: {
    marginTop: 10,
    fontSize: 16,
    color: "red",
  },
});

export default Header;
