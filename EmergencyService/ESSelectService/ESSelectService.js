import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {Routes} from '../../../Navigation/Routes';

const ServiceCard = ({ title, image, navigation, vehicleData }) => (
  <TouchableOpacity
    style={styles.serviceCard}
    onPress={() => {
      console.log(`Navigating to SelectVehicle with service: ${title}`);
      navigation.navigate(Routes.ESSelectAddress, {selectedService: title, vehicleData: vehicleData});}}>
    <Image source={image} style={styles.serviceImage} />
    <Text style={styles.serviceText}>{title}</Text>
  </TouchableOpacity>
);

const ServiceSection = ({ title, services, navigation, vehicleData }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.servicesGrid}>
      {services.map((service, index) => (
        <ServiceCard key={index} {...service} navigation={navigation} vehicleData={vehicleData}/>
      ))}
    </View>
  </View>
);

const SelectService = ({ navigation, route }) => {
  const { vehicleData } = route.params || {}; // Get vehicle data from navigation
  console.log(vehicleData);
  const bikeServices = [
    {
      title: 'Flar Tire',
      image: require('../../../assets/images/icons8-flat-tire-100.png'),
    },
    {
      title: 'Battery Jumpstart',
      image: require('../../../assets/images/icons8-car-battery-100.png'),
    },
    {
      title: 'Fuel Delivery',
      image: require('../../../assets/images/icons8-fuel-100.png'),
    },
    {
      title: 'Towing Service',
      image: require('../../../assets/images/icons8-tow-truck-100.png'),
    },
    {
      title: 'Engine Breakdown',
      image: require('../../../assets/images/icons8-engine-100.png'),
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faAngleLeft} size={24} color="#333"/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Roadside Assistance</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ServiceSection title="Emergency Services" services={bikeServices} navigation={navigation} vehicleData={vehicleData}/>
      </ScrollView>
    </View>
  );
};

export default SelectService;
