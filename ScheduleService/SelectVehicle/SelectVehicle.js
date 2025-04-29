import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,

} from 'react-native';
import {useAuth} from '../../../context/AuthContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {Routes} from '../../../Navigation/Routes';
import API_BASE_URL from '../../../config';
import styles from './style';

const SelectVehicle = ({navigation, route}) => {
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { idToken } = useAuth();
  const selectedService = route.params?.selectedService || 'No Service Selected';
  useEffect(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/vehicle-details`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${idToken}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (response.ok) {
          setVehicleData({
            name: `${data.vehicle.manufacturer} ${data.vehicle.model}`,
            model: data.vehicle.year,
            fuelType: data.vehicle.fuelType,
            lastServiceDate: data.vehicle.lastServiceDate? data.vehicle.lastServiceDate.split('T')[0] : 'Not Available',
            upcomingServiceDate: 'N/A',
            vehicleType: data.vehicle.vehicleType || 'unknown', // Get vehicleType
          });
        } else {
          console.error('Error fetching vehicle data:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVehicleDetails();
  }, []);

  const motorcycleImages = {
    'Honda Activa': require('../../../assets/images/vehicles/motorcycle/Activa.png'),
    'Honda CB350': require('../../../assets/images/vehicles/motorcycle/CB350.jpg'),
    'Honda CB500X': require('../../../assets/images/vehicles/motorcycle/CB500X.jpg'),
    'Yamaha FZ': require('../../../assets/images/vehicles/motorcycle/FZ.jpeg'),
    'Yamaha R15': require('../../../assets/images/vehicles/motorcycle/R15.jpeg'),
    'Royal Enfield Classic 350': require('../../../assets/images/vehicles/motorcycle/Classic350.jpg'),
    'Yamaha Fascino': require('../../../assets/images/vehicles/motorcycle/Fascino.jpg'),
    'Royal Enfield Himalayan': require('../../../assets/images/vehicles/motorcycle/Himalayan.jpg'),
    'Royal Enfield Meteor': require('../../../assets/images/vehicles/motorcycle/Meteor.jpeg'),
    'Yamaha MT-15': require('../../../assets/images/vehicles/motorcycle/MT-15.jpg'),
    'Honda Shine': require('../../../assets/images/vehicles/motorcycle/Shine.jpg'),
    'Honda Unicorn': require('../../../assets/images/vehicles/motorcycle/Unicorn.jpeg'),
    // Add more motorcycle models here
  };

  const carImages = {
    'Maruti Suzuki Brezza': require('../../../assets/images/vehicles/car/Brezza.jpeg'),
    'Tata Altroz': require('../../../assets/images/vehicles/car/Altroz.jpg'),
    'Hyundai Creta': require('../../../assets/images/vehicles/car/Creta.jpeg'),
    'Hyundai i20': require('../../../assets/images/vehicles/car/i20.jpg'),
    'Maruti Suzuki Ertiga': require('../../../assets/images/vehicles/car/Ertiga.jpg'),
    'Tata Harrier': require('../../../assets/images/vehicles/car/Harrier.jpg'),
    'Tata Nexon': require('../../../assets/images/vehicles/car/Nexon.webp'),
    'Tata Safari': require('../../../assets/images/vehicles/car/Safari.webp'),
    'Maruti Suzuki Swift': require('../../../assets/images/vehicles/car/Swift.webp'),
    'Hyundai Venue': require('../../../assets/images/vehicles/car/Venue.webp'),
    // Add more car models here
  };

  const vehicleImages = {
    motorcycle: motorcycleImages,
    car: carImages,
  };

  const defaultImage = require('../../../assets/images/applogo.png');

  const getVehicleImage = () => {
    if (!vehicleData) {
      return defaultImage;
    }

    const { vehicleType, name } = vehicleData;
    const type = vehicleType?.toLowerCase();

    if (vehicleImages[type] && vehicleImages[type][name]) {
      return vehicleImages[type][name];
    } else {
      return defaultImage;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faAngleLeft} size={24} color="#333"/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule a Service</Text>
      </View>
      <Text style={styles.sectionTitle}>Selected Service: {selectedService}</Text>
      <Text style={styles.sectionTitle}>Vehicle Overview</Text>


      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
      ) : vehicleData ? (
        <View style={styles.vehicleCard}>
          <Image source={getVehicleImage()} style={styles.vehicleImage} />
          <View style={styles.vehicleDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Vehicle Name:</Text>
              <Text style={styles.detailValue}>{vehicleData.name}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Vehicle Model:</Text>
              <Text style={styles.detailValue}>{vehicleData.model}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Fuel Type:</Text>
              <Text style={styles.detailValue}>{vehicleData.fuelType}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Last Service Date:</Text>
              <Text style={styles.detailValue}>{vehicleData.lastServiceDate}</Text>
            </View>
          </View>
        </View>
      ) : (
        <Text style={styles.noVehicleText}>No vehicle details found</Text>
      )}

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate(Routes.SelectAddress, {selectedService: selectedService, vehicleData: vehicleData})}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>

      <View style={styles.orContainer}>
        <View style={styles.orLine} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.orLine} />
      </View>

      <TouchableOpacity
        style={styles.otherVehicleButton}
        onPress={() => navigation.navigate(Routes.VehicleDetails)}>
        <Text style={styles.otherVehicleText}>Change Vehicle</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SelectVehicle;
