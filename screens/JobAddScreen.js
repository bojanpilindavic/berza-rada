import React, { useEffect, useState } from "react";
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
import { getFirestore, doc, getDoc, collection, addDoc, serverTimestamp } from "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";
import { auth } from "../firebase/firebaseConfig";
import DropdownMunicipality from "../components/DropdownMunicipality";
import Category from "../components/Category";
import { Ionicons } from "@expo/vector-icons";

const AddJobScreen = () => {
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [numberOfPositions, setNumberOfPositions] = useState("");
  const [endDate, setEndDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [description, setDescription] = useState("");
  const [conditions, setConditions] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const db = getFirestore();

  useEffect(() => {
    const fetchCompanyName = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCompanyName(docSnap.data().companyName || "");
        }
      }
    };
    fetchCompanyName();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) setEndDate(selectedDate);
  };

  const handleAddJob = async () => {
    if (!position || !numberOfPositions || !description || !conditions || !municipality || !endDate) {
      alert("Molimo popunite sva polja.");
      return;
    }

    const numberOfPositionsInt = parseInt(numberOfPositions);
    if (isNaN(numberOfPositionsInt) || numberOfPositionsInt <= 0) {
      alert("Unesite validan broj pozicija.");
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
        companyName,
        position,
        numberOfPositions: numberOfPositionsInt,
        endDate: formattedEndDate,
        description,
        conditions,
        municipality,
        category,
        createdAt: serverTimestamp(),
        userId: auth.currentUser.uid,
      };

      await addDoc(collection(db, "jobs"), jobData);
      alert("✅ Oglas uspešno dodat!");

      setPosition("");
      setNumberOfPositions("");
      setDescription("");
      setConditions("");
      setMunicipality("");
      setCategory("");
      setEndDate(new Date());
    } catch (error) {
      console.error("❌ Greška prilikom dodavanja oglasa:", error);
      alert("Došlo je do greške prilikom dodavanja oglasa.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <Text style={styles.title}>Objavi oglas</Text>

          <View style={styles.staticField}>
            <Text style={styles.label}>Naziv firme</Text>
            <Text style={styles.value}>{companyName || "Učitavanje..."}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="briefcase-outline" size={20} color="#555" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={position}
              onChangeText={setPosition}
              placeholder="Pozicija"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="people-outline" size={20} color="#555" style={styles.icon} />
            <TextInput
              style={styles.input}
              value={numberOfPositions}
              onChangeText={setNumberOfPositions}
              placeholder="Broj pozicija"
              keyboardType="numeric"
            />
          </View>

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

          <Text style={styles.label}>Opština</Text>
          <DropdownMunicipality selected={municipality} onSelect={setMunicipality} />

          <Text style={styles.label}>Kategorija</Text>
          <Category selected={category} onSelect={setCategory} />

        

          <Text style={styles.label}>Opis oglasa</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Opis radnih zadataka"
            multiline
          />
            <Text style={styles.label}>Uslovi posla</Text>
          <TextInput
            style={[styles.input, styles.textarea]}
            value={conditions}
            onChangeText={setConditions}
            placeholder="Strucna sprema, radno iskustvo, pozavanje stranog jezika ..."
            multiline
          />

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

export default AddJobScreen;

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
  staticField: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 4,
    color: "#274E6D",
  },
  value: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 6,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 10,
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
  textarea: {
    height: 100,
    textAlignVertical: "top",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
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
