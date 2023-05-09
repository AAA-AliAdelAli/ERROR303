import Login from "./screens/Login";
import Home from "./screens/Home";
import Register from "./screens/Register";
import ForgetPassword from "./screens/ForgetPassword";
import StackNavigator from "./StackNavigator";
import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from './Store';



const Stack = createNativeStackNavigator();

function App() {
  return (
  <>
      <Provider store={store}>
   
      <StackNavigator/>
      </Provider>

      </>
  );
}

export default App;
