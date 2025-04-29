import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator, ScrollView,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCalculator,
  faGasPump, faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import {Routes} from '../../Navigation/Routes';
import styles from './style';
import API_BASE_URL from '../../config';
import {useAuth} from '../../context/AuthContext';



const CalculatorCard = ({title, description, icon, onPress}) => (
  <TouchableOpacity style={styles.calculatorCard} onPress={onPress}>
    <View style={styles.calculatorIcon}>
      <FontAwesomeIcon icon={icon} size={24} color="#FFF" />
    </View>
    <View style={styles.calculatorInfo}>
      <Text style={styles.calculatorTitle}>{title}</Text>
      <Text style={styles.calculatorDescription}>{description}</Text>
    </View>
  </TouchableOpacity>
);

const MyVehicles = ({navigation}) => {

  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { idToken } = useAuth();
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

// Choose image based on vehicleType
  const motorcycleImages = {
    'Honda Activa': require('../../assets/images/vehicles/motorcycle/Activa.png'),
    'Honda CB350': require('../../assets/images/vehicles/motorcycle/CB350.jpg'),
    'Honda CB500X': require('../../assets/images/vehicles/motorcycle/CB500X.jpg'),
    'Yamaha FZ': require('../../assets/images/vehicles/motorcycle/FZ.jpeg'),
    'Yamaha R15': require('../../assets/images/vehicles/motorcycle/R15.jpeg'),
    'Royal Enfield Classic 350': require('../../assets/images/vehicles/motorcycle/Classic350.jpg'),
    'Yamaha Fascino': require('../../assets/images/vehicles/motorcycle/Fascino.jpg'),
    'Royal Enfield Himalayan': require('../../assets/images/vehicles/motorcycle/Himalayan.jpg'),
    'Royal Enfield Meteor': require('../../assets/images/vehicles/motorcycle/Meteor.jpeg'),
    'Yamaha MT-15': require('../../assets/images/vehicles/motorcycle/MT-15.jpg'),
    'Honda Shine': require('../../assets/images/vehicles/motorcycle/Shine.jpg'),
    'Honda Unicorn': require('../../assets/images/vehicles/motorcycle/Unicorn.jpeg'),
    // Add more motorcycle models here
  };

  const carImages = {
    'Maruti Suzuki Brezza': require('../../assets/images/vehicles/car/Brezza.jpeg'),
    'Tata Altroz': require('../../assets/images/vehicles/car/Altroz.jpg'),
    'Hyundai Creta': require('../../assets/images/vehicles/car/Creta.jpeg'),
    'Hyundai i20': require('../../assets/images/vehicles/car/i20.jpg'),
    'Maruti Suzuki Ertiga': require('../../assets/images/vehicles/car/Ertiga.jpg'),
    'Tata Harrier': require('../../assets/images/vehicles/car/Harrier.jpg'),
    'Tata Nexon': require('../../assets/images/vehicles/car/Nexon.webp'),
    'Tata Safari': require('../../assets/images/vehicles/car/Safari.webp'),
    'Maruti Suzuki Swift': require('../../assets/images/vehicles/car/Swift.webp'),
    'Hyundai Venue': require('../../assets/images/vehicles/car/Venue.webp'),
    // Add more car models here
  };

  const vehicleImages = {
    motorcycle: motorcycleImages,
    car: carImages,
  };

  const defaultImage = require('../../assets/images/applogo.png');

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
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faAngleLeft} size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Vehicles</Text>
        <View style={styles.headerRight} />
      </View>

        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
        ) : vehicleData ? (
          <View style={styles.vehicleCard}>
            <Image style={styles.vehicleImage} source={getVehicleImage()} />
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

        <View style={styles.addVehicleSection}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate(Routes.VehicleDetails)}>
            <Text style={styles.addButtonText}>Change Vehicle</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.calculatorsSection}>
          <CalculatorCard
            title="Mileage Calculator"
            description="Check how efficient your vehicle is"
            icon={faCalculator}
            onPress={() => navigation.navigate(Routes.MileageCalculator)}
          />
          <CalculatorCard
            title="Fuel Consumption Tracker"
            description="Monitor your fuel usage, cost and consumption trends"
            icon={faGasPump}
            onPress={() => navigation.navigate(Routes.FuelTracker)}
          />
        </View>
    </View>
</ScrollView>
  );
};


export default MyVehicles;
