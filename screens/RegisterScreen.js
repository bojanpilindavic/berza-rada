import React, { useState } from "react";
import { 
  View, Text, TextInput, Alert, TouchableOpacity, Image, ScrollView, 
  KeyboardAvoidingView, Platform, ActivityIndicator 
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { registerUser } from "../firebase/authService";
import { MaterialIcons } from "@expo/vector-icons";

const RegisterScreen = () => {
  const [userType, setUserType] = useState("worker");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [jib, setJib] = useState("");
  const [municipality, setMunicipality] = useState("Istočno Novo Sarajevo");
  const [image, setImage] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    if (userType === "worker" && (!fullName || !email || !password)) {
      Alert.alert("Greška", "Sva obavezna polja moraju biti popunjena!");
      return false;
    }
    if (userType === "employer" && (!companyName || !jib || !municipality || !email || !password)) {
      Alert.alert("Greška", "Sva obavezna polja moraju biti popunjena!");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateFields()) return; 

    setLoading(true);  // Prikazi loader

    try {
      await registerUser(email, password);
      Alert.alert("Proverite email", "Na vaš email je poslat link za potvrdu registracije.");
    } catch (error) {
      Alert.alert("Greška pri registraciji", error.message);
    } finally {
      setLoading(false);  // Sakrij loader
    }
  };

  const pickImage = async () => {
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

        {/* Upload slike */}
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
            <Text>Opština: *</Text>
            <TouchableOpacity style={styles.pickerButton} onPress={() => setShowPicker(true)}>
              <Text style={styles.pickerButtonText}>{municipality}</Text>
            </TouchableOpacity>
            {showPicker && (
              <Picker selectedValue={municipality} onValueChange={(itemValue) => {
                setMunicipality(itemValue);
                setShowPicker(false);
              }}>
                {["Istočno Novo Sarajevo", "Istočna Ilidža", "Pale", "Sokolac"].map((mun) => (
                  <Picker.Item key={mun} label={mun} value={mun} />
                ))}
              </Picker>
            )}
          </View>
        )}

        <Text>Email: *</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Unesite email" />
        <Text>Šifra: *</Text>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Unesite šifru" secureTextEntry />

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister} disabled={loading}>
          {loading ? <ActivityIndicator color="white" /> : <Text style={styles.registerButtonText}>Registruj se</Text>}
        </TouchableOpacity>
      </ScrollView>
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
};

export default RegisterScreen;
