import { StyleSheet, Text, View ,SafeAreaView,Pressable} from 'react-native'
import React ,{useEffect, useLayoutEffect} from 'react'
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { savedPlaces } from '../SavedReducer';
import COLORS from '../consts/Colors';

import hotels from '../consts/hotels';

const Booking = ({ route }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params && route.params.item) {
      dispatch(savedPlaces(route.params.item));
    }
  }, [route.params]);

  const bookings = useSelector((state) => state.booking.booking);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: "Bookings",
      headerTitleStyle: {
        fontSize: 20,
        fontWeight: "bold",
        color: COLORS.primary,
      },
      headerStyle: {
        backgroundColor: COLORS.dark,
        height: 110,
        borderBottomColor: "white",
        borderBottomWidth: 5,
        shadowColor: "transparent",
      },
    });
  }, []);

  return (
    <SafeAreaView style={{backgroundColor:COLORS.dark}}>
      {bookings.length > 0 &&
        bookings.map((item) => (
          <Pressable
            key={item?.id}
            style={{
              backgroundColor: "white",
              marginVertical: 10,
              marginHorizontal: 20,
              borderColor: "#E0E0E0",
              borderWidth: 1,
              padding: 14,
              borderRadius: 6,
            }}
          >
            <View >
              <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                {item?.name}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 7,
                }}
              >
                <MaterialIcons name="stars" size={24} color="green" />
                <Text
                  style={{ marginLeft: 3, fontSize: 15, fontWeight: "400" }}
                >
                  {item?.location}
                </Text>
                <Text style={{ marginLeft: 3 }}>•</Text>
                <View
                  style={{
                    padding: 6,
                    borderRadius: 4,
                    width: 100,
                    backgroundColor: "#0039a6",

                    marginLeft: 4,
                    borderRadius: 5,
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      color: "white",
                      fontSize: 13,
                      fontWeight: "400",
                    }}
                  >
                    booked
                  </Text>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
    </SafeAreaView>
  );
};

export default Booking;

const styles = StyleSheet.create({});
