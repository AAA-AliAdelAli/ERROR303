import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";

import { useNavigation } from "@react-navigation/core";

import { auth } from "../firebase";

import Home from "./Home";
import Register from "./Register";
import ForgotPassword from './ForgetPassword'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const sub = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Home");
      }
    });
    return sub;
  }, []);

  
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("logged with :", user.email);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View
      style={styles.Container}
       >
      <Text style={styles.Text}>Easy Booking</Text>
      <View styles={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="black"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="black"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonOutlineText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={[styles.buttonOutlineText, styles.buttonOutlineT]}>
            Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
          <Text style={styles.link}>ForgetPassword</Text>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#93b7eb",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  Text: {
    fontSize: 70,
    marginLeft: -10,
    fontWeight: "bold",
    color: "#1e5aad",
    position: "relative",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },

  inputContainer: {
    width: 50,
    marginTop: 10,
    padding: 50,
  },
  link: {
    color: "black",
    fontWeight: "bold",
    textDecorationLine: "underline",
    width: "160%",
    marginTop: 15,
    fontWeight: "bold",
  },

  input: {
    height: 40,
    marginTop: 15,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    width: 300,
    borderWidth: 1,
    color: "white",
    backgroundColor: "white",
    borderRadius: 5,
    fontWeight: "bold",
  },

  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#0782e2",
    width: "100%",
    padding: 15,
    borderRadius: 50,
    marginTop: 10,

    alignItems: "center",
  },
  buttonOutline: {
    color: "#fff",
    backgroundColor: "black",
    width: "100%",
    padding: 15,
    alignItems: "center",

    borderRadius: 50,
    marginTop: 10,
  },

  buttonOutlineText: {
    fontSize: 16,
    fontWeight: "700",
  },
  buttonOutlineT: {
    color: "#0782e2",
  },
});

export default Login;
