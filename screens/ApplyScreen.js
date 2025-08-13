import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const ApplyScreen = ({ route }) => {
  const { jobId, uid, employer: employerId } = route.params;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [cv, setCV] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });

      if (!result || result.canceled) return;

      const file = result.assets ? result.assets[0] : result;
      if (!file || !file.uri) {
        Alert.alert("Greška", "Neuspelo učitavanje CV-a.");
        return;
      }

      setCV(file);
    } catch (error) {
      Alert.alert("Greška", "Pokušajte ponovo.");
    }
  };

  const handleSubmit = async () => {
    if (!name || !email || !cv || !cv.uri) {
      Alert.alert("Greška", "Ime, email i CV su obavezni!");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "applications"), {
        name,
        email,
        message,
        cvName: cv.name,
        cvUri: cv.uri,
        jobId,
        appliedAt: new Date(),
        uid,
        employerId,
      });
      console.log("🟡 UID koji se šalje:", uid);

      Alert.alert("Uspešno", "Vaša prijava je uspešno poslata!");
      setName("");
      setEmail("");
      setMessage("");
      setCV(null);
    } catch (error) {
      console.error("❌ Greška pri slanju prijave:", error);
      Alert.alert("Greška", "Došlo je do greške pri slanju prijave.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Prijava na oglas</Text>

          <Text style={styles.label}>
            Ime i prezime <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Unesite ime i prezime"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>
            Email <Text style={styles.required}>*</Text>
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Unesite email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Poruka (opciono)</Text>
          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Ostavite poruku"
            value={message}
            onChangeText={setMessage}
            multiline
          />

          <Text style={styles.label}>
            Dodajte CV <Text style={styles.required}>*</Text>
          </Text>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={handleFileUpload}
          >
            <Text style={styles.uploadText}>
              {cv ? `📄 ${cv.name}` : "Dodaj CV"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.submitButton,
              loading && { backgroundColor: "#ccc" },
            ]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitText}>📨 Pošalji prijavu</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#e6f0fa",
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#274E6D",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#274E6D",
    marginTop: 10,
  },
  required: {
    color: "red",
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginTop: 6,
    fontSize: 16,
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
    color: "#5B8DB8",
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#5B8DB8",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ApplyScreen;
