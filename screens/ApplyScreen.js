import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert 
} from "react-native";
import * as DocumentPicker from "expo-document-picker";

const ApplyScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // Nije obavezno
  const [cv, setCV] = useState(null);

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });

      if (!result || result.canceled) {
        return; // Ako korisnik odustane, ne radi ništa
      }

      const file = result.assets ? result.assets[0] : result;
      
      if (!file || !file.uri) {
        Alert.alert("Greška", "Neuspelo učitavanje CV-a.");
        return;
      }

      setCV(file); // Čuva izabrani CV
    } catch (error) {
      Alert.alert("Greška pri učitavanju", "Pokušajte ponovo.");
    }
  };

  const handleSubmit = () => {
    if (!name || !email || !cv) {
      Alert.alert("Greška", "Ime, Email i CV su obavezni!");
      return;
    }

    Alert.alert("Uspešno", "Prijava poslata!");
    // Ovdje dodati backend logiku
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Ime i prezime <Text style={styles.required}>*</Text></Text>
      <TextInput 
        style={styles.input} 
        placeholder="Unesite ime" 
        value={name} 
        onChangeText={setName} 
      />

      <Text style={styles.label}>Email <Text style={styles.required}>*</Text></Text>
      <TextInput 
        style={styles.input} 
        placeholder="Unesite email" 
        value={email} 
        onChangeText={setEmail} 
        keyboardType="email-address" 
      />

      <Text style={styles.optionalText}>Ostavite poruku (opciono):</Text>
      <TextInput 
        style={[styles.input, styles.messageInput]} 
        placeholder="Vaša poruka (nije obavezno)" 
        value={message} 
        onChangeText={setMessage} 
        multiline 
      />

      <Text style={styles.label}>Dodajte CV <Text style={styles.required}>*</Text></Text>
      <TouchableOpacity style={styles.uploadButton} onPress={handleFileUpload}>
        <Text style={styles.uploadText}>
          {cv ? `📄 ${cv.name || "Izabrana datoteka"}` : "Dodaj CV"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Prijavi se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  required: {
    color: "red",
  },
  optionalText: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginTop: 5,
  },
  messageInput: {
    height: 80,
    textAlignVertical: "top",
  },
  uploadButton: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  uploadText: {
    fontSize: 16,
    color: "#007bff",
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitText: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
});

export default ApplyScreen;
