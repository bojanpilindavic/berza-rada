import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";

const municipalities = [
  "Istočno Novo Sarajevo",
  "Istočna Ilidža",
  "Pale",
  "Istočni Stari Grad",
  "Trnovo",
  "Sokolac"
];

export default function DropdownMunicipality({ selected, onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setOpen(!open)}
      >
        <Text style={styles.dropdownText}>
          {selected || "Izaberite opštinu"}
        </Text>
      </TouchableOpacity>

      {open && (
        <View style={styles.optionsContainer}>
          {municipalities.map((item) => (
            <TouchableOpacity
              key={item}
              onPress={() => {
                onSelect(item);
                setOpen(false);
              }}
              style={styles.option}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    zIndex: 999, // da bude iznad svega
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  dropdownText: {
    color: "#333",
  },
  optionsContainer: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
