import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Linking, ActivityIndicator,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faClock,
  faGear,
  faLocationDot,
  faPerson,
  faPhone,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import {Routes} from '../../../Navigation/Routes';
import API_BASE_URL from '../../../config';
import {useAuth} from '../../../context/AuthContext';

const MechanicFound = ({navigation, route}) => {
  const {requestId, latitude, longitude} = route.params;
  const {idToken} = useAuth();
  console.log(requestId);
  const [mechanic, setMechanic] = useState(null);
  const [loading, setLoading] = useState(true);
  const userLocation = {
    latitude: latitude || 13.0827, // Default to Chennai if missing
    longitude: longitude || 80.2707,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    fetchMechanicDetails();
  }, []);

  const fetchMechanicDetails = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/emergency/mechanic-details/${requestId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setMechanic(data);
      } else {
        console.error('Error:', data.message);
      }
    } catch (error) {
      console.error('Failed to fetch mechanic details:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleCall = () => {
      Linking.openURL(`tel:${mechanic.mechanic.phone}`);
  };

  const handleConfirm = () => {
    navigation.navigate(Routes.Home);
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </SafeAreaView>
    );
  }

  if (!mechanic) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.errorText}>Failed to load mechanic details.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={userLocation}
        showsUserLocation={true}
      >
        <Marker coordinate={userLocation}>
          <View style={styles.markerContainer}>
            <FontAwesomeIcon icon={faLocationDot} size={24} color="#007AFF" />
          </View>
        </Marker>

      <Marker coordinate={mechanic.mechanic.location}>
        <View style={styles.markerContainer}>
          <FontAwesomeIcon icon={faGear} size={24} color="blue" />
        </View>
      </Marker>
    </MapView>

      <View style={styles.mechanicCard}>
        <View style={styles.header}>
          <Text style={styles.foundText}>Mechanic Found!</Text>
          <View style={styles.ratingContainer}>
            <FontAwesomeIcon icon={faStar} size={16} color="#FFD700"/>
            <Text style={styles.rating}>{mechanic.mechanic.rating || 'N/A'}</Text>
          </View>
        </View>

        <View style={styles.mechanicInfo}>
          <View style={styles.profileImageContainer}>
            <FontAwesomeIcon icon={faPerson} size={60} color="#007AFF"/>
          </View>
          <View style={styles.details}>
            <Text style={styles.name}>{mechanic.mechanic.name}</Text>
            <View style={styles.infoRow}>
              <FontAwesomeIcon icon={faLocationDot} size={16} color="#666"/>
              <Text style={styles.infoText}>{mechanic.distance} away</Text>
            </View>
            <View style={styles.infoRow}>
              <FontAwesomeIcon icon={faClock} size={16} color="#666"/>
              <Text style={styles.infoText}>ETA: {mechanic.eta}</Text>
            </View>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <FontAwesomeIcon icon={faPhone} size={24} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmText}>Confirm Mechanic</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  mechanicCard: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  foundText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  rating: {
    marginLeft: 4,
    fontWeight: '600',
    color: '#FFB100',
  },
  mechanicInfo: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  profileImageContainer: {
    marginRight: 16,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoText: {
    marginLeft: 8,
    color: '#666',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  callButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E8F1FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#007AFF',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MechanicFound;
