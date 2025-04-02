import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const opstine = [
  "Istočno Novo Sarajevo",
  "Istočna Ilidža",
  "Pale",
  "Istočni Stari Grad",
  "Trnovo",
  "Sokolac"
];

const PretragaOpstine = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pretraga po opštinama</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {opstine.map((opstina, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => navigation.navigate("MunicipalityJobScreen", { municipality: opstina })}
          >
            <FontAwesome5 name="map-marker-alt" size={20} color="white" style={styles.icon} />
            <Text style={styles.buttonText}>{opstina}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#add8e6",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },
  icon: {
    marginRight: 8,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#000",
  },
});

export default PretragaOpstine;
