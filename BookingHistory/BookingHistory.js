import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {faAngleLeft, faAngleRight, faGears} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import { useAuth } from '../../context/AuthContext';
import API_BASE_URL from '../../config';

const BookingHistory = ({navigation}) => {
  const [selectedType, setSelectedType] = useState('all');
  const { idToken } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // // Dummy data - Replace with your API data
  // const bookings = [
  //   {
  //     id: 'B001',
  //     type: 'two_wheeler',
  //     vehicleName: 'Honda Activa',
  //     serviceType: 'Regular Service',
  //     date: '2025-03-20',
  //     status: 'completed',
  //     amount: '₹800',
  //     mechanicName: 'John Doe',
  //   },
  //   {
  //     id: 'B002',
  //     type: 'four_wheeler',
  //     vehicleName: 'Hyundai i20',
  //     serviceType: 'Oil Change',
  //     date: '2025-03-18',
  //     status: 'completed',
  //     amount: '₹2,500',
  //     mechanicName: 'Mike Ross',
  //   },
  // ];

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const emergencyResponse = await fetch(`${API_BASE_URL}/emergency/history`, {
          headers: {
            'Authorization': `Bearer ${idToken}`,
            'Content-Type': 'application/json',
          },
        });

        const scheduledResponse = await fetch(`${API_BASE_URL}/schedule/history`, {
          headers: {
            'Authorization': `Bearer ${idToken}`,
            'Content-Type': 'application/json',
          },
        });

        const emergencyData = await emergencyResponse.json();
        const scheduledData = await scheduledResponse.json();
        console.log(scheduledData);
        console.log(emergencyData);
        // Combine both bookings into one list
        const combinedBookings = [
          ...(emergencyData.bookings || []),
          ...(scheduledData.bookings || []),
        ];

        setBookings(combinedBookings);
      } catch (error) {
        console.error('Error fetching booking history:', error);
      }
    };

    fetchBookingHistory();
  }, []);

  const filteredBookings = selectedType === 'all'
    ? bookings
    : bookings.filter(booking => booking.vehicle?.vehicleType?.toLowerCase() === selectedType);

  const renderBookingCard = ({item}) => (
    <TouchableOpacity
      style={styles.bookingCard}
      onPress={() => navigation.navigate('BookingDetails', {booking: item})}
    >
      <View style={styles.cardHeader}>
        <View style={styles.vehicleInfo}>
          <FontAwesomeIcon icon={faGears} size={24} color="#007AFF"/>
          <Text style={styles.vehicleName}>{item.vehicle?.name || 'N/A'}</Text>
        </View>
        <Text style={styles.amount}>{item.amount || 'N/A'}</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.cardContent}>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Service Type:</Text>
          <Text style={styles.value}>{item.serviceName || item.issueType || 'N/A'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Date:</Text>
          <Text style={styles.value}>{item.date || (item.createdAt ? item.createdAt.split('T')[0] : 'N/A')}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <View style={[styles.statusBadge, styles[item.status]]}>
          <Text style={styles.statusText}>{item.status?.toUpperCase() || 'PENDING'}</Text>
        </View>
        <FontAwesomeIcon icon={faAngleRight} size={20} color="#666"/>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faAngleLeft} size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking History</Text>
        <View style={{width: 24}} />
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, selectedType === 'all' && styles.filterActive]}
          onPress={() => setSelectedType('all')}
        >
          <Text style={[styles.filterText, selectedType === 'all' && styles.filterTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedType === 'motorcycle' && styles.filterActive]}
          onPress={() => setSelectedType('motorcycle')}
        >
          <Text style={[styles.filterText, selectedType === 'motorcycle' && styles.filterTextActive]}>
            Two Wheeler
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, selectedType === 'car' && styles.filterActive]}
          onPress={() => setSelectedType('car')}
        >
          <Text style={[styles.filterText, selectedType === 'car' && styles.filterTextActive]}>
            Four Wheeler
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredBookings}
        renderItem={renderBookingCard}
        keyExtractor={(item, index) => item._id ? item._id.toString() : `booking-${index}`}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    gap: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
  },
  filterActive: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    color: '#666',
  },
  filterTextActive: {
    color: '#fff',
  },
  listContainer: {
    padding: 16,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  vehicleInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  vehicleName: {
    fontSize: 16,
    fontWeight: '600',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginVertical: 12,
  },
  cardContent: {
    gap: 8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    color: '#666',
  },
  value: {
    color: '#000',
    fontWeight: '500',
  },
  cardFooter: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  Completed: {
    backgroundColor: '#E8F5E9',
  },
  Pending: {
    backgroundColor: '#FFF3E0',
  },
  Scheduled: {
    backgroundColor: '#FFF3E0',
  },
  Accepted: {
    backgroundColor: '#FFF3E0',
  },
  Cancelled: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default BookingHistory;
