// AdminJobScreen.js

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { auth } from "../firebase/firebaseConfig";
import DropdownMunicipality from "../components/DropdownMunicipality";
import { Ionicons } from "@expo/vector-icons";

const AdminJobScreen = () => {
  const [employer, setEmployer] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [endDate, setEndDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);

  const db = getFirestore();

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const handleAddJob = async () => {
    if (!employer || !municipality || !endDate || !link) {
      alert("Molimo popunite sva polja.");
      return;
    }

    setLoading(true);
    try {
      const formattedEndDate = endDate.toLocaleDateString("sr-RS", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      });

      const jobData = {
        employer,
        municipality,
        endDate: formattedEndDate,
        link,
        createdAt: serverTimestamp(),
        userId: auth.currentUser ? auth.currentUser.uid : null,
      };

      await addDoc(collection(db, "adminJobs"), jobData);
      alert("✅ Oglas uspešno dodat!");

      setEmployer("");
      setMunicipality("");
      setEndDate(new Date());
      setLink("");
    } catch (error) {
      console.error("❌ Greška prilikom dodavanja oglasa:", error);
      alert("Došlo je do greške prilikom dodavanja oglasa.");
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
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Admin: Dodaj oglas</Text>

          {/* 1. Poslodavac */}
          <Text style={styles.label}>Poslodavac</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="business-outline" size={20} color="#555" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={employer}
              onChangeText={setEmployer}
              placeholder="Unesite ime poslodavca"
            />
          </View>

          {/* 2. Opština */}
          <Text style={styles.label}>Opština</Text>
          <DropdownMunicipality selected={municipality} onSelect={setMunicipality} />

          {/* 3. Trajanje konkursa */}
          <Text style={styles.label}>Trajanje konkursa</Text>
          <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.datePicker}>
            <Ionicons name="calendar-outline" size={20} color="#555" style={styles.icon} />
            <Text style={styles.dateText}>{endDate.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {showPicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={handleDateChange}
            />
          )}

          {/* 4. Link */}
          <Text style={styles.label}>Link</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="link-outline" size={20} color="#555" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={link}
              onChangeText={setLink}
              placeholder="Unesite URL oglasa"
              keyboardType="url"
              autoCapitalize="none"
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#5B8DB8" style={{ marginTop: 20 }} />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleAddJob}>
              <Text style={styles.buttonText}>📤 Objavi oglas</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AdminJobScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#e6f0fa",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#274E6D",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
    color: "#274E6D",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 6,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 15,
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
  },
  dateText: {
    marginLeft: 6,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#5B8DB8",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
