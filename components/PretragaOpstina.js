import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const opstine = [
  "Istočno Novo Sarajevo",
  "Istočna Ilidža",
  "Pale",
  "Istočni Stari Grad",
  "Trnovo",
  "Sokolac",
];

const PretragaOpstine = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pretraga po opštinama</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {opstine.map((opstina, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() =>
              navigation.navigate("MunicipalityJobScreen", {
                municipality: opstina,
              })
            }
          >
            <FontAwesome5
              name="map-marker-alt"
              size={18}
              color="#fff"
              style={styles.icon}
            />
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
    marginBottom: 30,
    paddingHorizontal: 16,
    backgroundColor: "#f4f6f8",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 12,
    color: "#274E6D",
  },
  scrollContainer: {
    paddingLeft: 4,
    paddingRight: 4,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#5B8DB8",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 25,
    marginRight: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  icon: {
    marginRight: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});

export default PretragaOpstine;
