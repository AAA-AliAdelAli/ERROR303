import React from "react";
import Home from "./screens/Home";
import Saved from "./screens/Saved";
import Booking from "./screens/Booking";
import Profile from "./screens/Profile";
import Edit from './screens/Edit';
import COLORS from "./consts/Colors";
import Login from "./screens/Login";
import Register from "./screens/Register";
import DetailsScreen from "./screens/DetailsScreen";
import ForgetPassword from "./screens/ForgetPassword";
import Welcome from "./screens/Welcome";


import { StyleSheet, Text, View , StatusBar} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {AntDesign, Entypo,Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";

const StackNavigator = () => {
  const Tab = createBottomTabNavigator();
  const Stack = createNativeStackNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator screenOptions={{
        tabBarStyle: { backgroundColor: 'black'  },
        tabBarItemStyle: { paddingBottom: 5 },
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontSize: 14 },
        tabBarIconStyle: { marginBottom: -3 },
      }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "Home",
            headerShown: false,
            fontWeight: "bold",

            tabBarIcon: ({ focused }) =>
              focused ? (
                <Entypo name="home" size={24} color={COLORS.light} />
              ) : (
                <AntDesign name="home" size={24} color="white" />
              ),
          }}
        />

        <Tab.Screen
          name="Saved"
          component={Saved}
          options={{
            tabBarLabel: "Saved",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <AntDesign name="heart" size={24} color={COLORS.light} />
              ) : (
                <AntDesign name="hearto" size={24} color="white" />
              ),
          }}
        />

        

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "Profile",
            headerShown: false,
            tabBarIcon: ({ focused }) =>
              focused ? (
                <Ionicons name="person" size={24} color={COLORS.light} />
              ) : (
                <Ionicons name="person-outline" size={24} color="white" />
              ),
          }}
        />
      </Tab.Navigator>
    );
  }
  
  return (
    <NavigationContainer>
       
      <Stack.Navigator>
        {/* <Stack.Screen name="Welcome" component={Welcome} options={{headerShown:false}}/> */}
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}}/>
        <Stack.Screen name="Edit" component={Edit} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} options={{headerShown:false}}/>
        <Stack.Screen name="Main" component={BottomTabs} options={{headerShown:false}}/>
        <Stack.Screen name="DetailsScreen"  component={DetailsScreen} options={{headerShown:false}} />
        <Stack.Screen name="Booking" component={Booking} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});