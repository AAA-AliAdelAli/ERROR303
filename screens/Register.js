import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import Login from "./Login";
import { auth } from "../firebase";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";


const Register = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Register with :", user.email);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    
      <ImageBackground
        source={require("../photos/background.jpg")} 
        style={styles.container}>
          
        <Text style={styles.title}>Easy Booking</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  img: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#1e5aad",
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    marginBottom: 20,
    color: "white",
    backgroundColor: "white",
  },
  button: {
    backgroundColor: "#1e5aad",
    padding: 10,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  link: {
    color: "white",
    fontWeight: "bold",

    textDecorationLine: "underline",
  },
});

export default Register;
