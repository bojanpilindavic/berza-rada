import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import About from "./About";
import Contact from "./Contact";

const Header = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigation = useNavigation();
  const auth = getAuth();
  const db = getFirestore();

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

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      navigation.navigate("JobSearchScreen", { query: searchTerm });
      setSearchTerm("");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setProfileMenuVisible(false);
    } catch (error) {
      console.error("Greška prilikom odjave:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* PRVI RED */}
      <View style={styles.topContainer}>
        <TouchableOpacity onPress={() => setMenuVisible(true)}>
          <Ionicons name="menu" size={30} color="#274E6D" />
        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: "center", maxHeight: 100 }}>
          <Image
            source={require("../assets/headert.png")}
            style={styles.headerLogo}
          />
        </View>

        <View style={styles.iconsContainer}>
          <TouchableOpacity
            onPress={() => {
              if (userType === "worker") {
                navigation.navigate("SavedJobsScreen");
              } else {
                navigation.navigate("MyJobScreen");
              }
            }}
          >
            <Ionicons name="heart-outline" size={24} color="#274E6D" />
          </TouchableOpacity>
          {user ? (
            <TouchableOpacity onPress={() => setProfileMenuVisible(true)}>
              <Ionicons
                name="person-circle-outline"
                size={30}
                color="#274E6D"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Ionicons name="log-in-outline" size={24} color="#274E6D" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* DRUGI RED */}
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
            onSubmitEditing={handleSearch}
          />
          <Ionicons name="mic" size={20} color="#555" />
        </View>
        {userType === "employer" || !user ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate(user ? "JobAddScreen" : "RegisterScreen")
            }
          >
            <Text style={styles.buttonText}>+ Objavi oglas</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* MODAL: Meni */}
      <Modal visible={menuVisible} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            {!user && (
              <TouchableOpacity
                onPress={() => {
                  setMenuVisible(false);
                  navigation.navigate("RegisterScreen");
                }}
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
            <TouchableOpacity
              style={[
                styles.modalButton,
                { alignSelf: "center", marginTop: 20 },
              ]}
              onPress={() => setMenuVisible(false)}
            >
              <Text style={styles.modalButtonText}>Zatvori</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL: Kontakt */}
      <Modal visible={contactVisible} animationType="slide">
        <SafeAreaView style={styles.fullscreenModal}>
          <Contact />
          <TouchableOpacity
            style={[styles.modalButton, { alignSelf: "center", marginTop: 20 }]}
            onPress={() => setContactVisible(false)}
          >
            <Text style={styles.modalButtonText}>Zatvori</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      {/* MODAL: O nama */}
      <Modal visible={aboutVisible} animationType="slide">
        <SafeAreaView style={styles.fullscreenModal}>
          <About />
          <TouchableOpacity
            style={[styles.modalButton, { alignSelf: "center", marginTop: 20 }]}
            onPress={() => setAboutVisible(false)}
          >
            <Text style={styles.modalButtonText}>Zatvori</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </Modal>

      {/* MODAL: Profil korisnika */}
      <Modal visible={profileMenuVisible} transparent animationType="slide">
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}
            >
              Profil meni
            </Text>
            <TouchableOpacity
              onPress={() => {
                setProfileMenuVisible(false);
                navigation.navigate("ProfileScreen"); // Prilagodi ime ako drugačije
              }}
            >
              <Text style={styles.menuItem}>👤 Moj profil</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={[styles.menuItem, { color: "red" }]}>
                🚪 Odjavi se
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modalButton,
                { alignSelf: "center", marginTop: 20 },
              ]}
              onPress={() => setProfileMenuVisible(false)}
            >
              <Text style={styles.modalButtonText}>Zatvori</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#A8E6CF",
    paddingBottom: 10,
  },
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerLogo: {
    width: 250,
    height: 140,
    resizeMode: "contain",
    marginTop: -36,
    marginLeft: 40,
  },
  iconsContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
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
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  menuItem: {
    fontSize: 16,
    paddingVertical: 12,
  },
  modalButton: {
    backgroundColor: "#274E6D",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  fullscreenModal: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "space-between",
  },
});

export default Header;
