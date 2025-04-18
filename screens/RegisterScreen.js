// RegisterScreen.js
import React, { useState } from "react";
import {
  View, Text, TextInput, Alert, TouchableOpacity, Image, ScrollView,
  KeyboardAvoidingView, Platform, ActivityIndicator, Modal, Button, StyleSheet
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TermsOfService from "../components/TermsOfService";
import PrivacyPolicy from "../components/PrivacyPolicy";
import DropdownMunicipality from "../components/DropdownMunicipality";
import { saveUserToFirestore } from "../firebase/firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [userType, setUserType] = useState("worker");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
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

  const validatePassword = (value) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    if (!hasUpperCase || !hasNumber || !hasSpecialChar) {
      return "Šifra mora imati bar jedno veliko slovo, broj i specijalan znak.";
    }
    return "";
  };

  const validateFields = () => {
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Unesite ispravan email.");
      isValid = false;
    } else {
      setEmailError("");
    }

    const pwError = validatePassword(password);
    if (pwError) {
      setPasswordError(pwError);
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Šifre se ne poklapaju.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (userType === "worker" && (!fullName || !email || !password)) {
      Alert.alert("Greška", "Sva obavezna polja moraju biti popunjena!");
      isValid = false;
    }

    if (
      userType === "employer" &&
      (!companyName || !jib || !municipality || !email || !password)
    ) {
      Alert.alert("Greška", "Sva obavezna polja moraju biti popunjena!");
      isValid = false;
    }

    if (!agreed) {
      Alert.alert("Greška", "Morate prihvatiti uslove korišćenja.");
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = async () => {
    if (!validateFields()) return;
    setLoading(true);
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await sendEmailVerification(user);

      await saveUserToFirestore(
        user.uid,
        userType,
        {
          email,
          ...(userType === "worker"
            ? { fullName, municipality }
            : { companyName, jib, activity, municipality }),
        },
        image
      );

      Alert.alert("Proverite email", "Na vaš email je poslat link za potvrdu registracije.");
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
      if (error.code === "auth/email-already-in-use") {
        setEmailError("Email adresa je već registrovana.");
      } else {
        Alert.alert("Greška", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Dozvola potrebna", "Morate omogućiti pristup galeriji.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const renderInput = (iconName, value, setValue, placeholder, secure = false, toggle = null, show = true) => (
    <View style={styles.inputContainer}>
      <Ionicons name={iconName} size={20} color="#555" style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        style={styles.inputField}
        secureTextEntry={secure && !show}
      />
      {toggle && (
        <TouchableOpacity onPress={toggle}>
          <Ionicons name={show ? "eye-off-outline" : "eye-outline"} size={20} color="#555" />
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Registracija</Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity style={[styles.tab, userType === "worker" && styles.activeTab]} onPress={() => setUserType("worker")}>
            <Text style={styles.tabText}>Radnik</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, userType === "employer" && styles.activeTab]} onPress={() => setUserType("employer")}>
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

        {userType === "worker"
          ? renderInput("person-outline", fullName, setFullName, "Ime i prezime")
          : <>
              {renderInput("business-outline", companyName, setCompanyName, "Naziv firme")}
              {renderInput("document-outline", jib, setJib, "JIB")}
              {renderInput("briefcase-outline", activity, setActivity, "Delatnost")}
              <DropdownMunicipality selected={municipality} onSelect={setMunicipality} />
            </>
        }

        {renderInput("mail-outline", email, setEmail, "Email")}
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        {renderInput("lock-closed-outline", password, setPassword, "Šifra", true, () => setShowPassword(!showPassword), showPassword)}
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

        {renderInput("lock-closed-outline", confirmPassword, setConfirmPassword, "Ponovi šifru", true, () => setShowConfirm(!showConfirm), showConfirm)}
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

        <TouchableOpacity style={styles.checkboxContainer} onPress={() => setAgreed(!agreed)}>
          <MaterialIcons name={agreed ? "check-box" : "check-box-outline-blank"} size={24} color="#007bff" />
          <Text style={styles.checkboxText}>
            Prihvatam{" "}
            <Text style={styles.link} onPress={() => setShowPrivacyModal(true)}>Politiku privatnosti</Text> i{" "}
            <Text style={styles.link} onPress={() => setShowTermsModal(true)}>Uslove korišćenja</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.registerButton, (!agreed || loading) && styles.disabledButton]} onPress={handleRegister} disabled={!agreed || loading}>
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.registerButtonText}>Registruj se</Text>}
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showPrivacyModal} animationType="slide" onRequestClose={() => setShowPrivacyModal(false)}>
        <View style={{ flex: 1, padding: 20 }}><PrivacyPolicy /><Button title="Zatvori" onPress={() => setShowPrivacyModal(false)} /></View>
      </Modal>

      <Modal visible={showTermsModal} animationType="slide" onRequestClose={() => setShowTermsModal(false)}>
        <View style={{ flex: 1, padding: 20 }}><TermsOfService /><Button title="Zatvori" onPress={() => setShowTermsModal(false)} /></View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: "#e6f0fa" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#274E6D" },
  tabContainer: { flexDirection: "row", marginBottom: 20 },
  tab: { flex: 1, padding: 10, alignItems: "center", backgroundColor: "#ccc" },
  activeTab: { backgroundColor: "#5B8DB8" },
  tabText: { fontSize: 16, fontWeight: "bold", color: "#fff" },
  imageContainer: { alignSelf: "center", marginBottom: 20 },
  image: { width: 100, height: 100, borderRadius: 50 },
  imagePlaceholder: { width: 100, height: 100, justifyContent: "center", alignItems: "center", borderWidth: 1, borderColor: "gray", borderRadius: 50 },
  imageButtonText: { fontSize: 12, color: "gray", textAlign: "center" },
  inputContainer: { width: "100%", flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderWidth: 1, borderColor: "#ccc", borderRadius: 5, marginBottom: 10, paddingHorizontal: 10 },
  icon: { marginRight: 5 },
  inputField: { flex: 1, paddingVertical: 10 },
  checkboxContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  checkboxText: { marginLeft: 10, fontSize: 14 },
  link: { color: "#007bff", textDecorationLine: "underline" },
  registerButton: { backgroundColor: "#5B8DB8", padding: 12, borderRadius: 5, alignItems: "center", marginTop: 15 },
  registerButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  disabledButton: { backgroundColor: "gray" },
  errorText: { color: "red", fontSize: 12, marginBottom: 5 },
});

export default RegisterScreen;
