import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";

const category = [
  "Turizam i ugostiteljstvo",
  "Tehnicke usluge",
  "Transport i logistika",
  "Ostalo",
];

export default function Category({ selected, onSelect }) {
  const [open, setOpen] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setOpen(!open)}
      >
        <Text style={styles.dropdownText}>
          {selected || "Izaberite kategoriju"}
        </Text>
      </TouchableOpacity>

      {open && (
        <View style={styles.optionsContainer}>
          {category.map((item) => (
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
