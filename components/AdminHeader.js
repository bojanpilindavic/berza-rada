// components/AdminHeader.js

import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import About from "./About";
import AdminJobScreen from "../screens/AdminJobScreen";

const AdminHeader = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigation = useNavigation();
  const auth = getAuth();
  const db = getFirestore();

  // Praćenje trenutno ulogovanog korisnika
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Logout funkcija
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setProfileMenuVisible(false);
      navigation.replace("LoginScreen");
    } catch (error) {
      console.error("Greška pri odjavi:", error);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigation.navigate("JobSearchScreen", { query: searchTerm });
      setSearchTerm("");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* GORNJI RED: Hamburger + logo + ikone */}
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu" size={30} color="#274E6D" />
        </TouchableOpacity>

        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/headert.png")}
            style={styles.headerLogo}
          />
        </View>

        <View style={styles.iconsContainer}>
          {user ? (
            <TouchableOpacity onPress={() => setProfileMenuVisible(true)}>
              <Ionicons name="person-circle-outline" size={30} color="#274E6D" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
              <Ionicons name="log-in-outline" size={24} color="#274E6D" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* DONJI RED: Search + Objavi oglas (admin) */}
      <View style={styles.bottomContainer}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#555" />
          <TextInput
            placeholder="Pretraži oglase..."
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmitEditing={handleSearch}
          />
          <Ionicons name="mic" size={20} color="#555" />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AdminJobScreen")}
        >
          <Text style={styles.buttonText}>+ Objavi oglas</Text>
        </TouchableOpacity>
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
              <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
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
            <About />
            <TouchableOpacity onPress={() => setAboutVisible(false)}>
              <Text style={styles.closeButton}>Zatvori</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default AdminHeader;

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#A8E6CF",
    paddingBottom: 10,
    paddingTop: -50,
    marginTop: -10,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 0,
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    maxHeight: 100,
  },
  headerLogo: {
    width: 250,
    height: 140,
    resizeMode: "contain",
    marginHorizontal: 10,
    marginTop: -16,
    marginLeft: 40,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
    backgroundColor: "#5B8DB8",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginLeft: 10,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#FFFFFF",
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
