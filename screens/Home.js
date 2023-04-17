import { useNavigation } from "@react-navigation/core";

import React, { useLayoutEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../firebase";
import Login from './Login';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import Header from '../components/Header';
import { shadow } from "react-native-paper";


const Home = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "EasyBooking",
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: 'white',
        fontSize: 20,
        fontWeight: "bold",
      },
      headerStyle: {
        height:80,
        backgroundColor: '#2f4069',
        borderBottomColor:'transparent',
        shadowColor:'transparent'
      },
      headerRight: () => (
        <Ionicons name="notifications" size={24} color="#eee" style={{ marginRight: 12 }} />

      )

    })
  }, [])

  return (
    <View style={styles.container}>
      <Header/>

    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container :{

  }
 
});
