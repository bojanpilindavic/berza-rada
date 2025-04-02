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
    // Provera da li su sva polja popunjena
    if (!position || !numberOfPositions || !description || !conditions || !municipality || !endDate) {
      alert("Molimo popunite sva polja.");
      return;
    }
  
    // Provera validnosti broja pozicija
    const numberOfPositionsInt = parseInt(numberOfPositions);
    if (isNaN(numberOfPositionsInt) || numberOfPositionsInt <= 0) {
      alert("Unesite validan broj pozicija.");
      return;
    }
  
    setLoading(true);
    try {
      // Formatiraj endDate u ISO format
      const formattedEndDate = endDate.toLocaleDateString('sr-RS', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
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
  
      // Reset formi
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
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    keyboardVerticalOffset={100} // podešavaš po potrebi da se ne preklapa
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Naziv firme</Text>
        <Text style={styles.textValue}>{companyName || "Učitavanje..."}</Text>

        <Text style={styles.label}>Pozicija</Text>
        <TextInput style={styles.input} value={position} onChangeText={setPosition} placeholder="Pozicija" />

        <Text style={styles.label}>Broj pozicija</Text>
        <TextInput
          style={styles.input}
          value={numberOfPositions}
          onChangeText={setNumberOfPositions}
          placeholder="Broj"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Trajanje konkursa</Text>
        <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.datePickerButton}>
          <Text style={styles.datePickerText}>{endDate.toLocaleDateString()}</Text>
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
        <View style={{ marginTop: 6, marginBottom: 12 }}>
          <DropdownMunicipality selected={municipality} onSelect={setMunicipality} />
        </View>

        <Text style={styles.label}>Kategorija</Text>
        <View style={{ marginTop: 6, marginBottom: 12 }}>
          <Category selected={category} onSelect={setCategory} />
        </View>

        <Text style={styles.label}>Uslovi posla</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={conditions}
          onChangeText={setConditions}
          placeholder="Uslovi (npr. plata, radno vreme...)"
          multiline
        />

        <Text style={styles.label}>Opis oglasa</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          value={description}
          onChangeText={setDescription}
          placeholder="Opis"
          multiline
        />

        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleAddJob}>
            <Text style={styles.buttonText}>📤 Dodaj oglas</Text>
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
    padding: 16,
    backgroundColor: "#fff",
  },
  label: {
    fontWeight: "bold",
    marginTop: 12,
  },
  textValue: {
    fontSize: 16,
    marginVertical: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    marginTop: 6,
  },
  datePickerButton: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 6,
    marginTop: 6,
  },
  datePickerText: {
    fontSize: 16,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
