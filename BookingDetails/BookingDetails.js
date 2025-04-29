import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft, faCalendar, faClock, faGear, faPhone, faUser, faWrench} from '@fortawesome/free-solid-svg-icons';

const BookingDetails = ({ route, navigation }) => {
  const { booking } = route.params;
  console.log(booking);

  const renderStatusBadge = (status) => {
    const statusColors = {
      Accepted: '#FFD700',
      Pending: '#FFD700',
      Scheduled: '#FFD700',
      Completed: '#4CD964',
      Cancelled: '#FF3B30',
    };

    return (
      <View style={[styles.statusBadge, { backgroundColor: statusColors[status.toLowerCase()] }]}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <FontAwesomeIcon icon={faAngleLeft} size={20} color="#007AFF"/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Booking ID and Status */}
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.bookingId}>Booking #{booking?._id}</Text>
            {renderStatusBadge(booking?.status || 'Pending')}
          </View>
        </View>

        {/* Service Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Service Details</Text>
          <View style={styles.detailRow}>
            <FontAwesomeIcon icon={faWrench} size={16} color="#666" />
            <Text style={styles.detailText}>{booking?.serviceName || booking.issueType}</Text>
          </View>
          <View style={styles.detailRow}>
            <FontAwesomeIcon icon={faCalendar} size={16} color="#666" />
            <Text style={styles.detailText}>{booking?.date || (booking.createdAt ? booking.createdAt.split('T')[0] : 'N/A')}</Text>
          </View>
          <View style={styles.detailRow}>
            <FontAwesomeIcon icon={faClock} size={16} color="#666" />
            <Text style={styles.detailText}>{booking?.time || booking.createdAt
              ? new Date(booking.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
              : 'N/A'}</Text>
          </View>
        </View>

        {/* Vehicle Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Vehicle Details</Text>
          <View style={styles.detailRow}>
            <FontAwesomeIcon icon={faGear} size={16} color="#666" />
            <Text style={styles.detailText}>{booking?.vehicle.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <FontAwesomeIcon icon={faGear} size={16} color="#666" />
            <Text style={styles.detailText}>{booking?.vehicle.vehicleType }</Text>
          </View>
          <View style={styles.detailRow}>
            <FontAwesomeIcon icon={faGear} size={16} color="#666" />
            <Text style={styles.detailText}>{booking?.vehicle.fuelType}</Text>
          </View>
        </View>

        {/* Price Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Price Details</Text>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service Charge</Text>
            <Text style={styles.priceValue}>₹{booking?.serviceCharge || 0}</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Parts & Materials</Text>
            <Text style={styles.priceValue}>₹{booking?.partsCharge || 0}</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalValue}>
              ₹{(booking?.serviceCharge || 0) + (booking?.partsCharge || 0)}
            </Text>
          </View>
        </View>

        {/* Mechanic Details (shown only if assigned) */}
        {booking?.mechanicName && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Mechanic Details</Text>
            <View style={styles.detailRow}>
              <FontAwesomeIcon icon={faUser} size={16} color="#666" />
              <Text style={styles.detailText}>{booking?.mechanicName}</Text>
            </View>
            {booking?.mechanicPhone && (
              <TouchableOpacity style={styles.callButton}>
                <FontAwesomeIcon icon={faPhone} size={16} color="#FFF" />
                <Text style={styles.callButtonText}>Call Mechanic</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingId: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    marginLeft: 12,
    fontSize: 14,
    color: '#666',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 14,
    color: '#333',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  callButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F8FF',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  callButtonText: {
    color: '#007AFF',
    marginLeft: 8,
    fontWeight: '500',
  },
});

export default BookingDetails;
