import React, { useState } from "react";
import {
  View, Text, TextInput, Alert, TouchableOpacity, Image, ScrollView,
  KeyboardAvoidingView, Platform, ActivityIndicator, Modal, Button
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { registerUser } from "../firebase/authService";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TermsOfService from "../components/TermsOfService";
import PrivacyPolicy from "../components/PrivacyPolicy";
import DropdownMunicipality from "../components/DropdownMunicipality";
import { saveUserToFirestore } from "../firebase/firebase";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [userType, setUserType] = useState("worker");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jib, setJib] = useState("");
  const [activity, setActivity] = useState(""); 
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [municipality, setMunicipality] = useState("");


  const validateFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (!emailRegex.test(email)) {
      Alert.alert("Greška", "Unesite ispravan email.");
      return false;
    }
  
    if (password !== confirmPassword) {
      Alert.alert("Greška", "Šifre se ne poklapaju.");
      return false;
    }
  
    if (userType === "worker" && (!fullName || !email || !password)) {
      Alert.alert("Greška", "Sva obavezna polja moraju biti popunjena!");
      return false;
    }
  
    if (userType === "employer" && (!companyName || !jib || !municipality || !email || !password)) {
      Alert.alert("Greška", "Sva obavezna polja moraju biti popunjena!");
      return false;
    }
  
    if (!agreed) {
      Alert.alert("Greška", "Morate prihvatiti uslove korišćenja.");
      return false;
    }
  
    return true;
  };

  const handleRegister = async () => {
    if (!validateFields()) return;
  
    setLoading(true);
  
    try {
      // 🔐 Registracija korisnika preko Firebase Auth
      const userCredential = await registerUser(email, password);
      const user = userCredential.user;
  
      // 💾 Snimanje korisnika u Firestore bazu
      await saveUserToFirestore(
        user.uid,
        userType,
        {
          email,
          ...(userType === "worker"
            ? {
                fullName,
                municipality,
              }
            : {
                companyName,
                jib,
                activity,
                municipality,
              }),
        },
        image
      );
  
      // ✅ Obaveštenje korisniku
      Alert.alert("Proverite email", "Na vaš email je poslat link za potvrdu registracije.");
  
      // ♻️ Resetovanje input polja
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setFullName("");
      setCompanyName("");
      setJib("");
      setActivity("");
      setImage(null);
      setMunicipality("");
      setAgreed(false);
    } catch (error) {
      Alert.alert("Greška pri registraciji", error.message);
    } finally {
      setLoading(false);
    }
  };


  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (status !== "granted") {
      Alert.alert("Dozvola potrebna", "Morate omogućiti pristup galeriji kako biste odabrali sliku.");
      return;
    }
  
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, userType === "worker" && styles.activeTab]}
            onPress={() => setUserType("worker")}
          >
            <Text style={styles.tabText}>Radnik</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, userType === "employer" && styles.activeTab]}
            onPress={() => setUserType("employer")}
          >
            <Text style={styles.tabText}>Poslodavac</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={styles.imagePlaceholder}>
              <MaterialIcons name="photo-camera" size={40} color="gray" />
              <Text style={styles.imageButtonText}>
                {userType === "worker" ? "Dodaj sliku" : "Dodaj logo"}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        {userType === "worker" ? (
          <View>
            <Text>Ime i Prezime: *</Text>
            <TextInput style={styles.input} value={fullName} onChangeText={setFullName} placeholder="Unesite ime i prezime" />
          </View>
        ) : (
          <View>
            <Text>Naziv firme: *</Text>
            <TextInput style={styles.input} value={companyName} onChangeText={setCompanyName} placeholder="Unesite naziv firme" />
            <Text>JIB: *</Text>
            <TextInput style={styles.input} value={jib} onChangeText={setJib} placeholder="Unesite JIB" />
            <Text>Delatnost:</Text>
            <TextInput style={styles.input} value={activity} onChangeText={setActivity} placeholder="Unesite delatnost" />
            <Text>Opština: *</Text>
            <DropdownMunicipality
              selected={municipality}
              onSelect={setMunicipality}
            />
          </View>
        )}

        <Text>Email: *</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Unesite email" />
        <Text>Šifra: *</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Unesite šifru" secureTextEntry />
        <Text>Potvrdi šifru: *</Text>
        <TextInput style={styles.input} value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Ponovo unesite šifru" secureTextEntry />

        <TouchableOpacity style={styles.checkboxContainer} onPress={() => setAgreed(!agreed)}>
          <MaterialIcons name={agreed ? "check-box" : "check-box-outline-blank"} size={24} color="#007bff" />
          <Text style={styles.checkboxText}>
            Prihvatam{" "}
            <Text style={styles.link} onPress={() => setShowPrivacyModal(true)}>
              Politiku privatnosti
            </Text>{" "}
            i{" "}
            <Text style={styles.link} onPress={() => setShowTermsModal(true)}>
              Uslove korišćenja
            </Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.registerButton, (!agreed || loading) && styles.disabledButton]} onPress={handleRegister} disabled={!agreed || loading}>
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.registerButtonText}>Registruj se</Text>}
        </TouchableOpacity>
      </ScrollView>

      {/* Modal za Politiku privatnosti */}
      <Modal visible={showPrivacyModal} animationType="slide" onRequestClose={() => setShowPrivacyModal(false)}>
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
          <PrivacyPolicy />
          <Button title="Zatvori" onPress={() => setShowPrivacyModal(false)} />
        </View>
      </Modal>

      {/* Modal za Uslove korišćenja */}
      <Modal visible={showTermsModal} animationType="slide" onRequestClose={() => setShowTermsModal(false)}>
        <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
          <TermsOfService />
          <Button title="Zatvori" onPress={() => setShowTermsModal(false)} />
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};


// 📌 **STILOVI**
const styles = {
  container: { flexGrow: 1, padding: 20, backgroundColor: "white" },
  tabContainer: { flexDirection: "row", marginBottom: 20 },
  tab: { flex: 1, padding: 10, alignItems: "center", backgroundColor: "lightgray" },
  activeTab: { backgroundColor: "#007bff" },
  tabText: { fontSize: 16, fontWeight: "bold", color: "white" },
  imageContainer: { alignSelf: "center", marginBottom: 20 },
  image: { width: 100, height: 100, borderRadius: 50 },
  imagePlaceholder: { width: 100, height: 100, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "gray", borderRadius: 50 },
  imageButtonText: { fontSize: 12, color: "gray", textAlign: "center" },
  input: { borderWidth: 1, borderColor: "gray", padding: 10, marginBottom: 10, borderRadius: 5, backgroundColor: "#f9f9f9" },
  pickerButton: { backgroundColor: "#f0f0f0", padding: 10, borderRadius: 5, marginTop: 5 },
  pickerButtonText: { fontSize: 16, textAlign: "center" },
  registerButton: { backgroundColor: "#007bff", padding: 12, borderRadius: 5, alignItems: "center", marginTop: 10 },
  registerButtonText: { color: "white", fontSize: 16 },
  checkboxContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  checkboxText: { marginLeft: 10, fontSize: 14 },
  link: { color: "#007bff", textDecorationLine: "underline" },
  disabledButton: { backgroundColor: "gray" },
};

export default RegisterScreen;
