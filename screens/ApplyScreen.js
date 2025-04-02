import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert 
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { db } from "../firebase/firebaseConfig";  // Prilagodi putanju prema tvom projektu
import { collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const ApplyScreen = ({ route }) => {
  const { jobId } = route.params;  // Dobijanje ID-ja oglasa iz rute
  const { uid } = route.params.uid;  
  const employerId  = route.params.employer;  

  
  console.log("uido",uid)
  console.log("poslo",route.params.employer)


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // Nije obavezno
  const [cv, setCV] = useState(null);
  const [loading, setLoading] = useState(false); // Dodavanje loading stanja

  // Funkcija za učitavanje CV-a
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

  // Funkcija za slanje prijave na Firebase
  const handleSubmit = async () => {
    if (!name || !email || !cv) {
      Alert.alert("Greška", "Ime, Email i CV su obavezni!");
      return;
    }

    setLoading(true);  // Aktiviraj loading

    try {
      // Dodavanje prijave u Firestore kolekciju "applications"
      await addDoc(collection(db, "applications"), {
        name,
        email,
        message,
        cvName: cv.name,  // Čuvanje imena CV datoteke
        cvUri: cv.uri,    // Čuvanje URI-a za CV
        jobId,            // Dodavanje ID-ja oglasa
        appliedAt: new Date(),
        uid : uid,
        employerId
        
      });

      setLoading(false);
      Alert.alert("Uspešno", "Vaša prijava je uspešno poslata!");

      // Resetovanje polja nakon slanja prijave
      setName("");
      setEmail("");
      setMessage("");
      setCV(null);

    } catch (error) {
      setLoading(false);
      Alert.alert("Greška", "Došlo je do greške pri slanju prijave. Pokušajte ponovo.");
    }
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

      <TouchableOpacity 
        style={styles.submitButton} 
        onPress={handleSubmit} 
        disabled={loading}  // Onemogući dugme dok traje slanje
      >
        <Text style={styles.submitText}>
          {loading ? "Slanje..." : "Prijavi se"}
        </Text>
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
