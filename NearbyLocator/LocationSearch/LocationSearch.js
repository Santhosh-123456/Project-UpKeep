import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Alert,Platform,
  ActivityIndicator,
} from 'react-native';
import { request, PERMISSIONS } from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';
import 'react-native-get-random-values';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import styles from './style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft, faSearch, faLocationDot} from '@fortawesome/free-solid-svg-icons';

const LocationSearch = ({navigation}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const locationFetched = useRef(false);

  const handleLocationSelect = (data, details) => {
    if (!details || !details.geometry) {
      console.error('Details not available!');
      return;
    }
    const {lat, lng} = details.geometry.location;
    const locationName = data.description;
    console.log('Location Details:', details.geometry.location);

    navigation.navigate('NearbyCenters', {
      selectedLocation: locationName,
      latitude: lat,
      longitude: lng,
    });
  };
  // 📍 Request Location Permission
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

  // 📍 Get Real-time User Location
  const handleYourLocationPress = async () => {
    setLoading(true);
    const hasPermission = await requestLocationPermission();

    if (!hasPermission) {
      setLoading(false);
      Alert.alert('Permission Denied', 'Please enable location permissions to continue.');
      return;
    }

    let watchId;
    watchId = Geolocation.watchPosition(
      (position) => {
        if (!locationFetched.current) {
          const { latitude, longitude } = position.coords;
          console.log('User Location:', latitude, longitude);

          // Pass real location to NearbyCenters screen
          navigation.navigate('NearbyCenters', {
            selectedLocation: 'Current Location',
            latitude,
            longitude,
          });

          locationFetched.current = true;
          setLoading(false);

          // Stop watching after first location fetch
          if (watchId) {
            Geolocation.clearWatch(watchId);
            console.log('Stopped location updates');
          }
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        setLoading(false);
        Alert.alert('Error', 'Failed to get your location. Please enable location services.');
      },
      { enableHighAccuracy: false, distanceFilter: 10 }
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faAngleLeft} size={24} color="#333"/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nearby Service Locator</Text>
      </View>

      <View style={{flex: 1, paddingHorizontal: 16}}>
        <GooglePlacesAutocomplete
          placeholder="Search location..."
          minLength={2}
          autoFocus={true}
          fetchDetails={true}
          onPress={(data, details = null) => {
            console.log('onPress triggered!');
            if (!details) {
              // Fetch details if not provided
              const placeId = data.place_id;
              const apiKey = 'AIzaSyASK5-bJtBM8jUbBLL8sS8xz8LnzInfe7o';
              fetch(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=geometry&key=${apiKey}`)
                .then(response => response.json())
                .then(result => {
                  if (result.result && result.result.geometry) {
                    handleLocationSelect(data, {
                      geometry: result.result.geometry
                    });
                  }
                })
                .catch(error => console.error('Error fetching place details:', error));
            } else {
              handleLocationSelect(data, details);
            }
          }}
          query={{
            key: 'AIzaSyASK5-bJtBM8jUbBLL8sS8xz8LnzInfe7o',
            language: 'en',
            types: '(cities)',  // This will help get better place suggestions
          }}
          GooglePlacesDetailsQuery={{
            fields: 'geometry,formatted_address,name',
          }}
          predefinedPlaces={[]}
          enablePoweredByContainer={false}
          keepResultsAfterBlur={true}  // This will help keep results visible
          listViewDisplayed="auto"
          debounce={200}  // Add debounce to prevent quick disappearing
          timeout={10000}  // Increased timeout
          textInputProps={{
            onFocus: () => setIsFocused(true),
            onBlur: () => setIsFocused(false),
            placeholderTextColor: '#666',
          }}
          renderLeftButton={() => (
            <View style={{justifyContent: 'center', marginLeft: 10}}>
              <FontAwesomeIcon icon={faSearch} size={20} color="#666"/>
            </View>
          )}
          styles={{
            container: {
              flex: 0,
              marginTop: 10,
            },
            textInput: {
              height: 50,
              fontSize: 16,
              backgroundColor: '#f5f5f5',
              paddingLeft: 35,
              borderRadius: 8,
            },
            listView: {
              backgroundColor: '#fff',
              borderRadius: 8,
              marginTop: 5,
              elevation: 3,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
            },
            row: {
              padding: 13,
              height: 50,
              flexDirection: 'row',
            },
            description: {
              fontSize: 15,
            },
            separator: {
              height: 1,
              backgroundColor: '#f0f0f0',
            },
          }}
          onFail={(error) => {
            console.error('Google Places API Error:', error);
            Alert.alert('Error', 'Failed to fetch location data');
          }}
          onNotFound={() => console.log('No results found')}
        />
      </View>

      <TouchableOpacity
        style={[styles.yourLocationButton]}
        onPress={handleYourLocationPress}
        disabled={loading}>
        <FontAwesomeIcon icon={faLocationDot} size={20} color="#333" style={{marginRight: 8}}/>
        <Text style={styles.yourLocationText}>
          {loading ? 'Getting Location...' : 'Your Location'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LocationSearch;
