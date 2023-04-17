import Login from "./screens/Login";
import Home from "./screens/Home";
import Register from "./screens/Register";
import ForgetPassword from "./screens/ForgetPassword";
import StackNavigator from "./StackNavigator";
import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";



const Stack = createNativeStackNavigator();

function App() {
  return (
  <>
       
      <StackNavigator/>
      </>
  );
}

export default App;
