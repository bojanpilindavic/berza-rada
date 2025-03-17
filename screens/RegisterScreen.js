import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, TouchableOpacity, Image, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { registerUser } from "../firebase/authService";
import { MaterialIcons } from "@expo/vector-icons";  // Ikone za bolji dizajn dugmadi

const RegisterScreen = () => {
  const [userType, setUserType] = useState("worker");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [occupation, setOccupation] = useState("");
  const [cv, setCv] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [jib, setJib] = useState("");
  const [activity, setActivity] = useState("");
  const [municipality, setMunicipality] = useState("Istočno Novo Sarajevo");
  const [image, setImage] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  // Funkcija za validaciju obaveznih polja
  const validateFields = () => {
    if (userType === "worker") {
      if (!fullName || !email || !password) {
        Alert.alert("Greška", "Sva obavezna polja moraju biti popunjena!");
        return false;
      }
    } else {
      if (!companyName || !jib || !municipality || !email || !password) {
        Alert.alert("Greška", "Sva obavezna polja moraju biti popunjena!");
        return false;
      }
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateFields()) return; // Ako polja nisu validna, ne ide dalje sa registracijom

    try {
      await registerUser(email, password);
      Alert.alert("Uspešno ste se registrovali!");
    } catch (error) {
      Alert.alert("Greška pri registraciji", error.message);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images', // Umesto ImagePicker.MediaTypeOptions.Images
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={{ flex: 1 }} 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
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

        {userType === "worker" ? (
          <View>
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <MaterialIcons name="photo-camera" size={24} color="white" />
              <Text style={styles.imageButtonText}>Dodaj sliku</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Text>Ime i Prezime: <Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} value={fullName} onChangeText={setFullName} placeholder="Unesite ime i prezime" />
            <Text>Email: <Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Unesite email" />
            <Text>Zanimanje (opcionalno):</Text>
            <TextInput style={styles.input} value={occupation} onChangeText={setOccupation} placeholder="Unesite zanimanje" />
            <Text>Šifra: <Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Unesite šifru" secureTextEntry />
            <Button title="Registruj se" onPress={handleRegister} />
          </View>
        ) : (
          <View>
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <MaterialIcons name="business" size={24} color="white" />
              <Text style={styles.imageButtonText}>Dodaj logo firme</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Text>Naziv firme: <Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} value={companyName} onChangeText={setCompanyName} placeholder="Unesite naziv firme" />
            <Text>JIB: <Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} value={jib} onChangeText={setJib} placeholder="Unesite JIB" />
            <Text>Djelatnost (opcionalno):</Text>
            <TextInput style={styles.input} value={activity} onChangeText={setActivity} placeholder="Unesite djelatnost" />
            <Text>Opština: <Text style={styles.required}>*</Text></Text>

            <TouchableOpacity style={styles.pickerButton} onPress={() => setShowPicker(true)}>
              <Text style={styles.pickerButtonText}>{municipality}</Text>
            </TouchableOpacity>

            {/* Picker za opštinu */}
            {showPicker && (
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={municipality}
                  onValueChange={(itemValue) => {
                    setMunicipality(itemValue);
                    setShowPicker(false);
                  }}
                  style={styles.picker}
                >
                  {["Istočno Novo Sarajevo", "Istočna Ilidža", "Pale", "Istočni Stari Grad", "Trnovo", "Sokolac"].map((mun) => (
                    <Picker.Item key={mun} label={mun} value={mun} />
                  ))}
                </Picker>
              </View>
            )}

            <Text>Email: <Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Unesite email" />
            <Text>Šifra: <Text style={styles.required}>*</Text></Text>
            <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder="Unesite šifru" secureTextEntry />
            <Button title="Registruj se" onPress={handleRegister} />
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = {
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "white",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    backgroundColor: "lightgray",
  },
  activeTab: {
    backgroundColor: "#007bff",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
  },
  pickerButton: {
    padding: 15,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  pickerButtonText: {
    fontSize: 16,
  },
  pickerContainer: {
    backgroundColor: "white",
    zIndex: 1000, // Postavi na vrh
    position: "absolute",
    top: 120, // Smanjio sam visinu sa 90 na 120 kako bi bio još niže
    left: 0,
    right: 0,
  },
  picker: {
    height: 200, // Povećao sam visinu sa 150 na 200
    width: "100%",
  },
  imageButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 5,
    marginBottom: 15,
    justifyContent: "center",
  },
  imageButtonText: {
    color: "white",
    marginLeft: 8,
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginVertical: 10,
  },
  required: {
    color: "red", // Dodavanje crvene boje za zvezdicu pored obaveznih polja
  },
};
export default RegisterScreen;
