import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Platform, ScrollView,
} from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {Routes} from '../../../Navigation/Routes';
import styles from './style';

const SelectAddress = ({navigation, route}) => {
  const selectedService = route.params?.selectedService || 'No Service Selected';
  const vehicleData = route.params?.vehicleData || {};  // Get vehicle details
  const [houseNumber, setHouseNumber] = useState('');
  const [streetName, setStreetName] = useState('');
  const [landmark, setLandmark] = useState('');
  const [area, setArea] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [loading, setLoading] = useState(true); // Added loading state
  const [region, setRegion] = useState({
    latitude: 13.0827,
    longitude: 80.2707,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  console.log(selectedService);
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
        { interval: 1000, enableHighAccuracy: false, distanceFilter: 10 }
      );
    };

    fetchLocation();

    return () => {
      if (watchId) {Geolocation.clearWatch(watchId);}
    };
  }, []);

  const handleContinue = () => {
    // Construct full address
    const fullAddress = [
      houseNumber,
      streetName,
      area,
      city,
      zipcode,
    ]
      .filter(item => item) // Remove empty values
      .join(', ') + (landmark ? ` (${landmark})` : '');

    // Handle address submission
    navigation.navigate(Routes.SelectSlot, {selectedService: selectedService, vehicleData: vehicleData, latitude: region.latitude, longitude: region.longitude, address: fullAddress});
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
<ScrollView>
      <View style={styles.addressContainer}>
        <View style={styles.addressHeader}>
          <Text style={styles.addressTitle}>Address</Text>
        </View>

        <Text style={styles.currentAddress} numberOfLines={2}>
          {[
            houseNumber,
            streetName,
            area,
            city,
            zipcode,
          ]
            .filter(item => item) // Remove empty values
            .join(', ')}
          {landmark ? ` (${landmark})` : ''}
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="House/Flat Number"
            value={houseNumber}
            onChangeText={setHouseNumber}
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="Street Name"
            value={streetName}
            onChangeText={setStreetName}
            placeholderTextColor="#999"
          />

          <TextInput
            style={styles.input}
            placeholder="Landmark"
            value={landmark}
            onChangeText={setLandmark}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Area"
            value={area}
            onChangeText={setArea}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
            placeholderTextColor="#999"
          />
          <TextInput
            style={styles.input}
            placeholder="Zipcode"
            value={zipcode}
            onChangeText={setZipcode}
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity
          style={[
            styles.continueButton,
            (!houseNumber || !streetName) && styles.continueButtonDisabled,
          ]}
          onPress={handleContinue}
          disabled={!houseNumber || !streetName}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
</ScrollView>
    </View>

  );
};


export default SelectAddress;
