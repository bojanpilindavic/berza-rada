import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [user, setUser] = useState(null);

  const navigation = useNavigation();
  const auth = getAuth();

  // Provera da li je korisnik prijavljen
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
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
            // Ako je korisnik prijavljen, prikaži dugme za profil
            <TouchableOpacity onPress={() => setProfileMenuVisible(true)}>
              <Ionicons name="person-circle-outline" size={30} color="black" />
            </TouchableOpacity>
          ) : (
            // Ako nije prijavljen, prikaži dugme za login
            <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
              <Ionicons name="log-in-outline" size={24} color="black" />
            </TouchableOpacity>
          )}

          <TouchableOpacity>
            <Ionicons name="help-circle-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* DRUGI RED: Search bar + Objavi oglas */}
      <View style={styles.bottomContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#555" />
          <TextInput placeholder="Pretraži oglase..." style={styles.searchInput} />
          <Ionicons name="mic" size={20} color="#555" />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>+ Objavi oglas</Text>
        </TouchableOpacity>
      </View>

      {/* MODAL: Profil meni */}
      <Modal visible={profileMenuVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Moj profil</Text>
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
            <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
              <Text style={styles.menuItem}>📝 Registracija</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setMenuVisible(false); setContactVisible(true); }}>
              <Text style={styles.menuItem}>📞 Kontakt</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setMenuVisible(false); setAboutVisible(true); }}>
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
            <Text>Aplikacija za povezivanje poslodavaca i radnika.</Text>
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
  closeButton: {
    marginTop: 10,
    fontSize: 16,
    color: "red",
  },
});

export default Header;
