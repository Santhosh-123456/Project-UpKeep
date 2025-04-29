import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform, Alert,
} from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {Routes} from '../../../Navigation/Routes';
import styles from './style';
import axios from 'axios';
import {useAuth} from '../../../context/AuthContext';
import API_BASE_URL from '../../../config';

const ESSelectAddress = ({navigation, route}) => {
  const [loading, setLoading] = useState(true); // Added loading state
  const { vehicleData } = route.params || {}; // Get vehicle data from navigation
  const { selectedService } = route.params || {}; // Get vehicle data from navigation
  const { idToken } = useAuth();
  console.log(selectedService);
  console.log(vehicleData);
  const [region, setRegion] = useState({
    latitude: 13.0827,
    longitude: 80.2707,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const locationFetched = useRef(false); // Flag to stop updates after first fetch

  const requestLocationPermission = async () => {
    console.log('Requesting location permission...');
    if (Platform.OS === 'android') {
      const granted = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      console.log('Android location permission granted:', granted);
      return granted === 'granted';
    } else {
      const granted = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      console.log('iOS location permission granted:', granted);
      return granted === 'granted';
    }
  };
  // Get user's current location
  useEffect(() => {
    let watchId;

    const fetchLocation = async () => {
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        setLoading(false);
        return;}

      watchId = Geolocation.watchPosition(
        (position) => {
          if (!locationFetched.current) {
            const {latitude, longitude} = position.coords;
            setRegion((prev) => ({
              ...prev,
              latitude,
              longitude,
            }));
            locationFetched.current = true; // Mark location as fetched
            setLoading(false);
            console.log('Live Location Updated:', latitude, longitude);
            // Stop watching after the first update
            if (watchId) {
              Geolocation.clearWatch(watchId);
              console.log('Stopped location updates');
            }
          }
        },
        (error) => {
          console.error('WatchPosition Error:', error);
          setLoading(false);
        },
        { enableHighAccuracy: false, distanceFilter: 10 }
      );
    };

    fetchLocation();

    return () => {
      if (watchId) {Geolocation.clearWatch(watchId);}
    };
  }, []);

  const createEmergencyRequest = async () => {
      try{
      // API Request
      const response = await axios.post(
        `${API_BASE_URL}/emergency/create-request`, // Replace with your backend URL
        {
          latitude: region.latitude,
          longitude: region.longitude,
          issueType: selectedService,
          vehicle: vehicleData,
        },
        {
          headers: { Authorization: `Bearer ${idToken}` }, // Pass Firebase token
        }
      );

      console.log('Emergency Request Created:', response.data);
      Alert.alert('Success', 'Emergency request created successfully!');
        // Extract requestId from response
        const requestId = response.data.requestId;

        if (!requestId) {
          throw new Error('Request ID missing in response');
        }
      // Navigate to Searching Mechanic screen
      navigation.navigate(Routes.SearchingMechanic, {
        selectedService,
        vehicleData,
        latitude: region.latitude,
        longitude: region.longitude,
        requestId,
      });
    } catch (error) {
      console.error('Error creating emergency request:', error);
      Alert.alert('Error', 'Failed to create emergency request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Fetching location...</Text>
          </View>
        ) : (
          <MapView
            style={styles.map}
            region={region}
            showsUserLocation={false}>
            {region && <Marker coordinate={region} title="Your Location" />}
          </MapView>
        )}
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faTimes} size={20} color="#666" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
            style={[
              styles.continueButton,
              (loading || !region.latitude || !region.longitude) && styles.continueButtonDisabled,
            ]}
            onPress={createEmergencyRequest}
            disabled={loading || !region.latitude || !region.longitude}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
    </View>

  );
};


export default ESSelectAddress;
