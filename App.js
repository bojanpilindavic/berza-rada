// App.js
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack"; 
import HomeScreen from "./screens/HomeScreen"; 
import JobDetailsScreen from "./screens/JobDetailsScreen"; 
import ApplyScreen from "./screens/ApplyScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import JobAddScreen from "./screens/JobAddScreen";
import EmployerApplicationsScreen from "./screens/EmployerApplicationsScreen";
import WorkerApplicationsScreen from "./screens/WorkerApplicationsScreen";
import CategoryJobsScreen from "./screens/CategoryJobsScreen";
import MunicipalityJobScreen from "./screens/MunicipalityJobScreen";
import JobSearchScreen from "./screens/JobSearchScreen";
import SplashScreen from "./screens/SplashScreen";
import MyJobScreen from "./screens/MyJobScreen";
import SavedJobsScreen from "./screens/SavedJobScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          screenOptions={{
            headerTintColor: '#75D5C2',
            headerTitleStyle: { color: '#5B8DB8' },
            headerStyle: { backgroundColor: '#FFFFFF' }
          }}
        >
          <Stack.Screen name="SplashScreen" options={{ headerShown: false }} component={SplashScreen} />
          <Stack.Screen name="HomeScreen" options={{ headerShown: false, title: "Početna" }} component={HomeScreen} />
          <Stack.Screen name="JobDetailsScreen" options={{ title: "Detalji posla" }} component={JobDetailsScreen} />
          <Stack.Screen name="ApplyScreen" options={{ title: "Prijava na oglas" }} component={ApplyScreen} />
          <Stack.Screen name="RegisterScreen" options={{ title: "Registracija" }} component={RegisterScreen} />
          <Stack.Screen name="LoginScreen" options={{ title: "Prijava" }} component={LoginScreen} />
          <Stack.Screen name="ProfileScreen" options={{ title: "Moj profil" }} component={ProfileScreen} />
          <Stack.Screen name="JobAddScreen" options={{ title: "Dodavanje oglasa" }} component={JobAddScreen} />
          <Stack.Screen name="EmployerApplicationsScreen" options={{ title: "Moje prijave" }} component={EmployerApplicationsScreen} />
          <Stack.Screen name="WorkerApplicationsScreen" options={{ title: "Moje prijave" }} component={WorkerApplicationsScreen} />
          <Stack.Screen name="CategoryJobsScreen" options={{ title: "Pretraga" }} component={CategoryJobsScreen} />
          <Stack.Screen name="MunicipalityJobScreen" options={{ title: "Pretraga" }} component={MunicipalityJobScreen} />
          <Stack.Screen name="JobSearchScreen" options={{ title: "Pretraga" }} component={JobSearchScreen} />
          <Stack.Screen name="MyJobScreen" options={{ title: "" }} component={MyJobScreen} />
          <Stack.Screen
            name="SavedJobsScreen"
            component={SavedJobsScreen}
            options={{ title: "Sačuvani oglasi" }}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
