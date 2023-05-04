import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Login";
import Register from "./Register";

const Welcome = ({ navigation }) => {
  return (
    <ImageBackground
      style={styles.img}
      source={require("../assets/hotel1.jpg")}
    >
      <View style={styles.vi}>
        <Text style={styles.Text}>EasyBooking</Text>

        <Text style={styles.mText}>
          easy booking the best way to find hotel what are you waiting!
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={styles.button}
        >
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
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  img: {
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
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
  Text: {
    fontSize: 70,
    fontWeight: "bold",
    justifyContent: "center",
    position: "absolute",
    top: 50,
    color: "#1e5aad",
  },
  mText: {
    fontSize: 35,
    fontWeight: "bold",
    alignItems: "center",
    position: "absolute",
    margin: 5,
    top: 480,
    color: "#eee",
  },

  vi: {
    position: "absolute",
    width: "100%",
    height: 200,
    top: 20,
  },
});

export default Welcome;
