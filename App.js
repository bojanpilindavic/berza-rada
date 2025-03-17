// App.js
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context"; 
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"; // Dodajte ovo
import HomeScreen from "./screens/HomeScreen"; // Vaš glavni ekran
import JobDetailsScreen from "./screens/JobDetailsScreen"; // Ekran za prikaz detalja posla
import ApplyScreen from "./screens/ApplyScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";

const Stack = createStackNavigator(); // Kreiramo stack navigator

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="HomeScreen">
          <Stack.Screen name="HomeScreen" options={{ title: "Pocetna" }}  component={HomeScreen} />
          <Stack.Screen name="JobDetailsScreen" options={{ title: "Detalji posla" }}  component={JobDetailsScreen} />
          <Stack.Screen name="ApplyScreen" options={{ title: "Prijava na oglas" }}  component={ApplyScreen} />
          <Stack.Screen name="RegisterScreen" options={{ title: "Registracija" }}  component={RegisterScreen} />
          <Stack.Screen name="LoginScreen" options={{ title: "Prijava" }}  component={LoginScreen} />



        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
