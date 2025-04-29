import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Easing,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleCheck} from '@fortawesome/free-solid-svg-icons';

const BookingConfirmed = ({navigation}) => {
  const route = useRoute();
  const {bookingId, paymentId} = route.params;
  const scaleValue = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 500,
      easing: Easing.elastic(1),
      useNativeDriver: true,
    }).start();
  }, []);

  const animatedStyle = {
    transform: [{scale: scaleValue}],
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.View style={[styles.iconContainer, animatedStyle]}>
          <FontAwesomeIcon icon={faCircleCheck} size={100} color="#4CD964"/>
        </Animated.View>

        <Text style={styles.title}>Booking Confirmed</Text>

        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <Text style={styles.label}>Booking ID:</Text>
            <Text style={styles.value}>{bookingId}</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.detailRow}>
            <Text style={styles.label}>Payment ID:</Text>
            <Text style={styles.value}>{paymentId}</Text>
          </View>
        </View>

        <Text style={styles.message}>
          Your booking has been confirmed. You will receive a notification with further details.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  detailsCard: {
    width: '100%',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default BookingConfirmed;
