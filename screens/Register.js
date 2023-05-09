import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import Login from "./Login";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  Alert
} from "react-native";
import COLORS from "../consts/Colors";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import { getFirestore, doc, setDoc } from "firebase/firestore";

const Register = () => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const db = getFirestore();

  const addUserToDataBase = async () => {
    await setDoc(doc(db, 'users', auth.currentUser.uid), {
      setFirstName: firstName,
      setLastName:lastName,
      email: email,
      username: username,
    });
  };

  const handleSignUp = () => {
    if (validateEmail(email) && validatePassword(password)  ) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const email = userCredential._tokenResponse.email;

          console.log("Register");
          const user = userCredential.user;
          addUserToDataBase();
          navigation.replace("Main");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('Check your email');
        });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,12}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
      );
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EasyBooking</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        placeholderTextColor={COLORS.dark}
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        placeholderTextColor={COLORS.dark}
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor={COLORS.dark}
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={COLORS.dark}
        value={email}
        onChangeText={setEmail}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholderTextColor={COLORS.dark}
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        />
        {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  
  container: {
    backgroundColor: "#222831",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: COLORS.primary,
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    marginBottom: 20,
    color: COLORS.dark,
    backgroundColor: "white",
  },
  button: {
    backgroundColor:  COLORS.primary,
    padding: 10,
    borderRadius: 5,
    
    width: "80%",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize:20,
  },
  link: {
    marginTop:10,
    fontSize:18,
    color: "#eee",
    fontWeight: "bold",

    textDecorationLine: "underline",
  },
  errorText: {
    color: "#f00",
    marginBottom: 10,
  },
});

export default Register;































  // const handleSignUp = () => {
  //   if(name === "" || username ==="" || email===""||password===""){
  //     Alert.alert('invalid detials',
  //        'enter all userCredentials ', [
  //         {
  //           text: 'Cancel',
  //           onPress: () => console.log('Cancel Pressed'),
  //           style: 'cancel',
  //         },
  //         {text: 'OK', onPress: () => console.log('OK Pressed')},
  //       ]);
  //   }
  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then((userCredentials) => {
  //       const user = userCredentials.user;
  //       console.log("Register with :", user.email);
       
  //       navigation.replace("Main");
  //     })
  //     // .catch((error) => {
  //     //   alert(error.message);
  //     // });
  // };
  /**
 * const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');


  const handleSignUp = () => {
    if (validateEmail(email) && validatePassword(password) && validateConfirmPassword(password, confirmPassword) &&  validatePhone(phone)) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log('User Registered');
          const user = userCredential.user;
          navigation.navigate('BookHomePage');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('Check your inputs');
        });
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,12}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number'
      );
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  
  };

 */
