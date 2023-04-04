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

import { auth } from "../firebase"

import Home  from './Home'; 

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
    <ImageBackground
      style={styles.Container}
      source={require("../photos/background.jpg")}
    >
      <Text style={styles.Text}>Easy Booking</Text>
      <View styles={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="white"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="white"
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
          onPress={handleSignUp}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={[styles.buttonOutlineText, styles.buttonOutlineT]}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#164382",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "white",
  },
  Text: {
    fontSize: 70,
    fontWeight: "bold",
    color: "#fff",
    position: "relative",
    justifyContent: "flex-start",
    alignItems: 'flex-start',
    
  },

  inputContainer: {
    width:50,
    marginTop: 10,
    padding: 50,
  },

  input: {
    height: 40,
    marginTop: 25,
    width: 300,
    borderWidth: 1,
    borderColor: "#d6d7da",
    borderRadius: 5,
    color:'white',
    fontWeight: 'bold',
    
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
    color: "#eee",
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
