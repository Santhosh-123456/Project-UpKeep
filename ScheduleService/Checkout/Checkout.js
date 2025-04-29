import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView, Alert,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faChevronLeft,
  faHouse,
  faClock,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import RazorpayCheckout from 'react-native-razorpay';
import {Routes} from '../../../Navigation/Routes';
import styles from './style';
import {useAuth} from '../../../context/AuthContext';
import API_BASE_URL from '../../../config';


const Checkout = ({navigation, route}) => {
  const [quantity, setQuantity] = useState(1);
  const basePrice = 500;
  const [selectedDate] = useState(route.params?.selectedDate || new Date());
  const [selectedTime] = useState(route.params?.selectedTime || '11:30 AM');
  const selectedService = route.params?.selectedService || 'No Service Selected';
  const vehicleData = route.params?.vehicleData || {};  // Get vehicle details
  const latitude = route.params?.latitude;
  const longitude = route.params?.longitude;
  const address = route.params?.address;
  const { phoneNumber, idToken, userName } = useAuth();
  console.log('Address:', address);
  console.log('Latitude:', latitude, 'Longitude:', longitude);
  console.log(selectedService);
  console.log('vehicleData:', vehicleData);

  const getFormattedDate = (date) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${days[date.getDay()]}, ${months[date.getMonth()]} ${date.getDate()}`;
  };

  const createServiceBooking = async (paymentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/schedule/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`, // Send Firebase token for authentication
        },
        body: JSON.stringify({
          serviceName: selectedService, // Use the same name for now
          date: selectedDate.toISOString().split('T')[0], // Format: YYYY-MM-DD
          time: selectedTime,
          address,
          coordinates: {
            latitude,
            longitude,
          },
          vehicle: {
            name: vehicleData.name,
            modelYear: vehicleData.modelYear,
            fuelType: vehicleData.fuelType,
            vehicleType: vehicleData.vehicleType,
          },
          amount: basePrice * quantity,
          paymentId,
        }),
      });
      // 🔴 Log the raw response before parsing
      const data = await response.json();
      console.log('Raw API Response:', data);

      if (response.ok) {
        Alert.alert('Booking Successful', `Service booked with ID: ${data.booking._id}`);
        navigation.navigate(Routes.BookingConfirmed, { paymentId, bookingId: data.booking._id });
      } else {
        throw new Error(data.message || 'Failed to create service booking');
      }
    } catch (error) {
      console.error('Booking Error:', error);
      Alert.alert('Booking Failed', error.message);
    }
  };
  const handlePayment = async () => {
    try {
      const totalAmount = basePrice * quantity * 100; // Convert to paise
      const options = {
        description: 'UpKeep Service Payment',
        image: 'https://your-logo-url.com/logo.png',
        currency: 'INR',
        key: 'rzp_test_aTCgBOxoW2Hy7u', // Replace with your Razorpay Key ID
        amount: totalAmount,
        name: 'UpKeep',
        prefill: {
          email: 'user@example.com',
          contact: phoneNumber,
          name: userName,
        },
        theme: { color: '#528FF0' },
      };

      // Open Razorpay payment
      const data = await RazorpayCheckout.open(options);

      // Show success alert
      Alert.alert('Payment Successful', `Payment ID: ${data.razorpay_payment_id}`);

      // Call createServiceBooking with the successful payment ID
      await createServiceBooking(data.razorpay_payment_id);
    } catch (error) {
      Alert.alert('Payment Failed', error.description || 'Something went wrong');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <FontAwesomeIcon icon={faChevronLeft} size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Your Cart</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Service Item */}
        <View style={styles.serviceCard}>
          <Text style={styles.serviceName}>Service Name:{selectedService}</Text>
          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => navigation.navigate(Routes.SelectService)}>
              <Text style={styles.changeButton}>Change</Text>
            </TouchableOpacity>
            <Text style={styles.price}>Rs.{basePrice * quantity}</Text>
          </View>
        </View>

        {/* Contact Info */}
        <View style={styles.infoCard}>
          <View style={styles.contactRow}>
            <FontAwesomeIcon icon={faClock} size={20} color="#666" />
            <Text style={styles.contactText}>
              Verified Customer,{'\n'}{phoneNumber}
            </Text>
          </View>
        </View>

        {/* Payment Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Payment Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryText}>Item Total</Text>
            <Text style={styles.summaryText}>Rs.{basePrice * quantity}</Text>
          </View>
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalText}>Total</Text>
            <Text style={styles.totalText}>Rs.{basePrice * quantity}</Text>
          </View>
        </View>

        {/* Address and Time */}
        <TouchableOpacity
          style={styles.detailRow}
          onPress={() => navigation.navigate(Routes.SelectAddress)}>
          <FontAwesomeIcon icon={faHouse} size={20} color="#666" />
          <Text style={styles.detailText}>Address: {address}</Text>
          <FontAwesomeIcon icon={faPen} size={16} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.detailRow}
          onPress={() => navigation.navigate(Routes.SelectSlot)}>
          <FontAwesomeIcon icon={faClock} size={20} color="#666" />
          <Text style={styles.detailText}> {getFormattedDate(selectedDate)} - {selectedTime}
          </Text>
          <FontAwesomeIcon icon={faPen} size={16} color="#007AFF" />
        </TouchableOpacity>
      </ScrollView>

      {/* Proceed Button */}
      <TouchableOpacity
        style={styles.proceedButton}
        onPress={handlePayment}>
        <Text style={styles.proceedButtonText}>Proceed to pay</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};



export default Checkout;
