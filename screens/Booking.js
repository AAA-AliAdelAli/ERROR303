import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Calendar } from 'react-native-calendars';
import COLORS from '../consts/Colors';

const Booking = ({ navigation, route }) => {
  // Check if route.params exists before accessing its properties
  if (!route.params) {
    return (
      <View>
        <Text>No items yet</Text>
      </View>
    );
  }

  const { item } = route.params;
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [price, setPrice] = useState(item.price);
  const [numOfNights, setNumOfNights] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleDatesSelect = (dates) => {
    const selectedDates = Object.keys(dates);
    if (selectedDates.length === 1) {
      setCheckInDate(selectedDates[0]);
      setCheckOutDate('');
      setPrice(item.price);
      setNumOfNights(0);
    } else if (selectedDates.length === 2) {
      const checkIn = new Date(selectedDates[0]);
      const checkOut = new Date(selectedDates[1]);
      const nights = Math.floor((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      setCheckInDate(selectedDates[0]);
      setCheckOutDate(selectedDates[1]);
      setNumOfNights(nights);
      setPrice(item.price * nights);
    }
    setShowCheckInCalendar(false); // hide check-in calendar
    setShowCheckOutCalendar(false); // hide check-out calendar
  };


  const handlePaymentMethodChange = (value) => {
    setPaymentMethod(value);
  };

  const disabledDates = {};
  const start = new Date();
  const end = new Date(2024, 12, 31);
  for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
    const date = new Date(d);
    const dateString = date.toISOString().split('T')[0];
    disabledDates[dateString] = { disabled: true, disableTouchEvent: true };
  }

  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);

  const handleCheckInPress = () => {
    setShowCheckInCalendar(true);
    setShowCheckOutCalendar(false);
  };

  const handleCheckOutPress = () => {
    setShowCheckInCalendar(false);
    setShowCheckOutCalendar(true);
  };

  return (
    <View style={styles.container}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.hotelName}>{item.name}</Text>
        <Text style={styles.hotelLocation}>{item.location}</Text>
        <Text style={styles.hotelPrice}>${price}</Text>
        <View style={styles.checkInOutContainer}>
          <View style={styles.checkInOut}>
            <TouchableOpacity onPress={handleCheckInPress}>
              <Text style={styles.checkInOutLabel}>Check-in Date:</Text>
              <Text style={styles.checkInOutValue}>{checkInDate ? checkInDate : 'Select Date'}</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.checkInOut}>
            <TouchableOpacity onPress={handleCheckOutPress}>
              <Text style={styles.checkInOutLabel}>Check-out Date:</Text>
              <Text style={styles.checkInOutValue}>{checkOutDate ? checkOutDate : 'Select Date'}</Text>
            </TouchableOpacity>
          </View>
        </View>
        {showCheckInCalendar && (
          
          <Calendar theme={{
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: 'blue',
            indicatorColor: 'blue',
            textDayFontWeight: 'bold',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
            onDayPress={(day) => handleDatesSelect({ [day.dateString]: { selected: true } })}
            markedDates={{
              [checkInDate]: { selected: true, startingDay: true },
              [checkOutDate]: { selected: true, endingDay: true },
            }}
            disabledDates={disabledDates}
            minDate={new Date()}
            maxDate={end}
            hideExtraDays
          />
          
        )}
        {showCheckOutCalendar && (
          
          <Calendar 
          theme={{
            calendarBackground: '#ffffff',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: 'blue',
            indicatorColor: 'blue',
            textDayFontWeight: 'bold',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: 'bold',
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16
          }}
            onDayPress={(day) => handleDatesSelect({ [checkInDate]: { startingDay: true }, [day.dateString]: { selected: true } })}
            markedDates={{
              [checkInDate]: { selected: true, startingDay: true },
              [checkOutDate]: { selected: true, endingDay: true },
            }}
            disabledDates={disabledDates}
            minDate={new Date(checkInDate)}
            maxDate={end}
            hideExtraDays
          />
        
        )}
      
        <TouchableOpacity style={styles.bookBtn}>
          <Text style={styles.bookBtnText}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLORS.dark,
    color: COLORS.white,
    
  },
  image: {
    width: '100%',
    height: 200,
  },
  infoContainer: {
    padding: 20,
  },
  hotelName: {
    color:COLORS.primary,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  hotelLocation: {

    fontSize: 18,
    color: COLORS.white,
    marginBottom: 10,
  },
  hotelPrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color:COLORS.white,
    marginBottom: 20,
  },
  checkInOutContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  checkInOut: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkInOutLabel: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
  checkInOutValue: {
    color:COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  
  
  bookBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookBtnText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Booking;