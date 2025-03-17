import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();
  const auth = getAuth();

  const handleLogin = () => {
    setErrorMessage(""); // Resetujemo grešku pre pokušaja prijave
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("User logged in:", userCredential.user);
        navigation.reset({
          index: 0,
          routes: [{ name: "HomeScreen" }],
        });
      })
      .catch((error) => {
        setErrorMessage("Pogrešni kredencijali. Pokušajte ponovo.");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Prijava</Text>
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Šifra"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Prijavi se</Text>
      </TouchableOpacity>
      
      <Text style={styles.registerText}>Nemate nalog?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}> 
        <Text style={styles.registerLink}>Registrujte se</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  registerText: {
    marginTop: 15,
    fontSize: 14,
  },
  registerLink: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default LoginScreen;
