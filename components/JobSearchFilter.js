import React, { useState } from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity } from "react-native";

const dummyJobs = [
  { id: "1", firma: "Firma A", position: "Programer", location: "Beograd" },
  { id: "2", firma: "Firma B", position: "Dizajner", location: "Novi Sad" },
  { id: "3", firma: "Firma C", position: "Menadžer", location: "Beograd" },
];

const JobSearchFilter = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  const filteredJobs = dummyJobs.filter(job =>
    job.firma.toLowerCase().includes(searchText.toLowerCase()) ||
    job.position.toLowerCase().includes(searchText.toLowerCase())
  ).filter(job => (selectedLocation ? job.location === selectedLocation : true));

  return (
    <View style={{ padding: 10 }}>
      <TextInput
        placeholder="Pretraži posao..."
        value={searchText}
        onChangeText={setSearchText}
        style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
      />

      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        {["Beograd", "Novi Sad"].map(location => (
          <TouchableOpacity key={location} onPress={() => setSelectedLocation(location === selectedLocation ? "" : location)}>
            <Text style={{
              padding: 8,
              margin: 5,
              backgroundColor: selectedLocation === location ? "blue" : "gray",
              color: "white"
            }}>
              {location}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredJobs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.firma} - {item.position} ({item.location})</Text>
          </View>
        )}
      />
    </View>
  );
};

export default JobSearchFilter;
