import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState, useEffect } from "react";

import { useNavigation } from "@react-navigation/core";

import { auth } from "../firebase";
import StackNavigator from "../StackNavigator";
import Home from "./Home";
import Register from "./Register";
import ForgotPassword from './ForgetPassword'
import COLORS from "../consts/Colors";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();


  useEffect(() => {
    const sub = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.replace("Main");    }
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
    <SafeAreaView
      style={styles.Container}
    >
      <KeyboardAvoidingView>
        <View style={styles.TextContainer}>
          <Text style={styles.TextTitle}>EasyBooking</Text>
          <Text style={styles.Text}>sign in to your accout</Text>
        </View>
        <View styles={styles.inputCont}>
          <TextInput
            placeholder="Email"
            placeholderTextColor={COLORS.dark} 
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={[styles.input, styles.inputM, { backgroundColor: 'white' }]}
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor={COLORS.dark}
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={[styles.inputM ,{ backgroundColor: 'white' }]}
            secureTextEntry
          />
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.buttonOutlineText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}

        >
          <Text style={styles.link} >
            Register

          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
          <Text style={styles.link}>ForgetPassword</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={[]} style={styles.googleLoginButton}>
          <Text style={styles.buttonOutlineText}>Login with Google</Text>
        </TouchableOpacity>



      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#222831",
    flex: 1,
    padding: 10,
    alignItems: 'center',
    color: "#fff",
  },
  TextContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  TextTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00adb5",
  },
  Text: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
    color: "#fff"
  },
  inputCont:{
    backgroundColor: "#fff",
  },
  input: {
    height: 40,
    marginTop: 60,
    marginBottom: 30,
    padding: 10,
    borderWidth: 1,
    width: 300,
    borderWidth: 2,
    color:"#fff",
    borderRadius: 5,
    fontWeight: "bold",
  },
  inputM: {
    height: 40,
    padding: 10,
    width: 300,
    borderWidth: 2,
    borderRadius: 5,
    fontWeight: "bold",
    color: "black",
  },
  RegisterBt: {
    width: 200,
    backgroundColor: "#00adb5",
    padding: 15,
    borderRadius: 7,
    alignItems: 'center',
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
  },
  loginButton: {
    marginTop: 30,
    backgroundColor: "#00adb5",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonOutlineText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    fontSize: 16,
    color: "#f0f0f0",
    textAlign: 'center',
    marginBottom: 16,
  },
  googleLoginButton: {
    backgroundColor: "#00adb5",
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
});


export default Login;

