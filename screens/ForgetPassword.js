import React, { useState } from "react";
import { View, TextInput, Button, Alert, StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/core";
import COLORS from "../consts/Colors";

import { auth } from "../firebase";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleResetPassword = () => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert("Password reset email sent!");
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  return (

    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Button
        title="Reset Password"
        onPress={handleResetPassword}
        color={COLORS.primary}

      />
    </View>

  );
};
const styles = StyleSheet.create({
  container: {

    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.dark,
    color: "black",
  },
  input: {
    width: 200,
    marginBottom: 15,
    padding: 5,
    backgroundColor: "white",
  },
  bt: {


  }


});

export default ForgetPassword;
