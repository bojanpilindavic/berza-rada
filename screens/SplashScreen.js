import React, { useEffect } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("HomeScreen"); // Menja Splash screen sa Home screenom
    }, 4000); // 4 sekunde prikaza

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/organizacija.png")} style={styles.logo} />
      <Text style={styles.appName}>Berza rada</Text>
      <Image source={require("../assets/header.png")} style={styles.sponsors} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa", // Možeš promeniti boju
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  sponsors: {
    width: 280,
    height: 190,
    resizeMode: "contain",
  },
});

export default SplashScreen;
