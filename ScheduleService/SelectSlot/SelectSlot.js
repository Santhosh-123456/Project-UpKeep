import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Routes} from '../../../Navigation/Routes';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import styles from './style';

const SelectSlot = ({navigation, route}) => {
  const selectedService = route.params?.selectedService || 'No Service Selected';
  const vehicleData = route.params?.vehicleData || {};  // Get vehicle details
  const latitude = route.params?.latitude;
  const longitude = route.params?.longitude;
  const address = route.params?.address;
  console.log('Address:', address);
  console.log('Latitude:', latitude, 'Longitude:', longitude);
  console.log(selectedService);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const [timeSlots] = useState([
    '08:00 AM', '08:30 AM', '09:00 AM',
    '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM',
    '12:30 PM', '01:00 PM', '01:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM',
  ]);

  useEffect(() => {
    // Generate next 7 days
    const dates = [];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Move to tomorrow

    for (let i = 0; i < 7; i++) {
      const date = new Date(tomorrow);
      date.setDate(tomorrow.getDate() + i);
      dates.push({
        date: date,
        day: date.toLocaleDateString('en-US', {weekday: 'short'}),
        dayNum: date.getDate().toString().padStart(2, '0'),
      });
    }
    setAvailableDates(dates);
    // Set first date as default selected
    setSelectedDate(dates[0]);
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time selection when date changes
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleProceedToCheckout = () => {
    if (selectedDate && selectedTime) {
      // You can pass the selected date and time to the next screen
      navigation.navigate(Routes.Checkout, {
        selectedDate: selectedDate.date,
        selectedTime: selectedTime,
        selectedService: selectedService,
        vehicleData: vehicleData,
        address: address,
        latitude: latitude,
        longitude: longitude,
      });
    }
  };

  const isDateSelected = (date) =>
    selectedDate && date.date.toDateString() === selectedDate.date.toDateString();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faAngleLeft} size={24} color="#333"/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule a Service</Text>
      </View>

      {/* Date Selection */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.dateScrollView}
        contentContainerStyle={styles.dateContainer}>
        {availableDates.map((date, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dateButton,
              isDateSelected(date) && styles.selectedDateButton,
            ]}
            onPress={() => handleDateSelect(date)}>
            <Text
              style={[
                styles.dayText,
                isDateSelected(date) && styles.selectedDateText,
              ]}>
              {date.day}
            </Text>
            <Text
              style={[
                styles.dateText,
                isDateSelected(date) && styles.selectedDateText,
              ]}>
              {date.dayNum}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Time Slots Grid */}
      <ScrollView style={styles.timeContainer}>
        <View style={styles.timeGrid}>
          {timeSlots.map((time, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.timeSlot,
                selectedTime === time && styles.selectedTimeSlot,
              ]}
              onPress={() => handleTimeSelect(time)}>
              <Text
                style={[
                  styles.timeText,
                  selectedTime === time && styles.selectedTimeText,
                ]}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* Proceed Button */}
      <TouchableOpacity
        style={[
          styles.proceedButton,
          (!selectedDate || !selectedTime) && styles.proceedButtonDisabled,
        ]}
        onPress={handleProceedToCheckout}
        disabled={!selectedDate || !selectedTime}>
        <Text style={styles.proceedButtonText}>Proceed to checkout</Text>
      </TouchableOpacity>
    </View>
  );
};



export default SelectSlot;
