import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  SafeAreaView,
  Alert,
} from 'react-native';
import MapView, {Circle, PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMagnifyingGlassLocation} from '@fortawesome/free-solid-svg-icons';
import API_BASE_URL from '../../../config';

const {width} = Dimensions.get('window');

const SearchingMechanic = ({navigation, route}) => {
  // Animation values for the three waves
  const wave1 = useRef(new Animated.Value(0)).current;
  const wave2 = useRef(new Animated.Value(0)).current;
  const wave3 = useRef(new Animated.Value(0)).current;
  const [searching, setSearching] = useState(true);
  const { latitude, longitude, requestId } = route.params || {};
  console.log(latitude, longitude, requestId);

  const userLocation = {
    latitude,
    longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  useEffect(() => {
    // Animation for the waves
    const createWaveAnimation = (value) => {
      return Animated.sequence([
        Animated.timing(value, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(value, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]);
    };

    // Create infinite animations with different delays
    Animated.loop(createWaveAnimation(wave1)).start();
    setTimeout(() => {
      Animated.loop(createWaveAnimation(wave2)).start();
    }, 666);
    setTimeout(() => {
      Animated.loop(createWaveAnimation(wave3)).start();
    }, 1333);

    const interval = setInterval(checkForAcceptedMechanic, 5000); // Check every 5 sec


    // Set timeout to stop searching after 3 minutes
    const timeout = setTimeout(() => {
      setSearching(false);
      clearInterval(interval);
      Alert.alert('No Mechanic Found', 'Try again later.');
      navigation.goBack();
    }, 180000); // 3 minutes

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  // Function to check if a mechanic has accepted the request
  const checkForAcceptedMechanic = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/emergency/request-status/${requestId}`
      );

      if (response.data.status === 'Accepted') {
        clearInterval(checkForAcceptedMechanic); // Stop checking
        navigation.replace('MechanicFound', {
          requestId: requestId,latitude: latitude,longitude: longitude,
        });
      }
    } catch (error) {
      console.error('Error checking request status:', error);
    }
  };

  const waves = [wave1, wave2, wave3].map((wave, index) => ({
    transform: [
      {
        scale: wave.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 4],
        }),
      },
    ],
    opacity: wave.interpolate({
      inputRange: [0, 1],
      outputRange: [0.8, 0],
    }),
  }));

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={userLocation}
        showsUserLocation={true}
      >
        <Circle
          center={userLocation}
          radius={2000}
          fillColor="rgba(0, 122, 255, 0.1)"
          strokeWidth={0}
        />
      </MapView>

      <View style={styles.searchingContainer}>
        <View style={styles.wavesContainer}>
          {waves.map((waveStyle, index) => (
            <Animated.View
              key={index}
              style={[styles.wave, waveStyle]}
            />
          ))}
          <View style={styles.centerDot}>
            <FontAwesomeIcon icon={faMagnifyingGlassLocation} size={24} color="#007AFF"/>
          </View>
        </View>
        <Text style={styles.searchingText}>Searching for mechanics nearby</Text>
        <Text style={styles.subText}>This may take a few moments</Text>
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
  searchingContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  wavesContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  wave: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007AFF',
  },
  centerDot: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  searchingText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: '#666',
  },
});

export default SearchingMechanic;
