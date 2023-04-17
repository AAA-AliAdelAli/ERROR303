import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import firebase from "../firebase";
// import firebase from '@react-native-firebase/app';


const Profile = () => {
  const [name, setName] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const [username, setUsername] = useState("");
  const [data, setData] = useState([]);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await firestore().collection('users').get();
        const dataArray = snapshot.docs.map(doc => doc.data());
        setData(dataArray);
      } catch (error) {
        console.log('Failed to fetch data:', error);
      }
    };
    fetchData();
  }, []);

  const handleNameChange = (text) => {
    setName(text);
  };

  const handleAccountStatusChange = (text) => {
    setAccountStatus(text);
  };

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{name}</Text>

      <Text style={styles.label}>Account Status:</Text>
      <Text style={styles.value}>{accountStatus}</Text>

      <Text style={styles.label}>Username:</Text>
      <Text style={styles.value}>{username}</Text>

      <TouchableOpacity style={styles.settingsButton}>
        <Text style={styles.settingsButtonText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
  settingsButton: {
    position: "absolute",
    bottom: 16,
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignSelf: "center",
  },
  settingsButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Profile;
