import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const categories = [
  { id: 1, name: "Turizam i ugostiteljstvo", icon: "restaurant-outline" },
  { id: 2, name: "Tehničke usluge", icon: "construct-outline" },
  { id: 3, name: "Transport i logistika", icon: "bus-outline" },
  { id: 4, name: "Prehrambena industrija", icon: "fast-food-outline" },
  { id: 5, name: "Građevina i geodezija", icon: "business-outline" },
  { id: 6, name: "Elektrotehnika", icon: "flash-outline" },
];

const JobCategories = () => {
  const navigation = useNavigation();

  const handleCategoryPress = (categoryName) => {
    navigation.navigate("CategoryJobsScreen", { category: categoryName });
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scrollContainer}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={styles.category}
          onPress={() => handleCategoryPress(category.name)}
        >
          <Ionicons name={category.icon} size={30} color="black" />
          <Text style={styles.text}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  category: {
    alignItems: "center",
    marginRight: 15,
    backgroundColor: "#f0f0f0",
    padding: 10,
    borderRadius: 10,
    minWidth: 100,
  },
  text: {
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
  },
});

export default JobCategories;
