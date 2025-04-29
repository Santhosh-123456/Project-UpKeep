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

const ServiceCard = ({ title, image, navigation }) => (
  <TouchableOpacity
    style={styles.serviceCard}
    onPress={() => {
      console.log(`Navigating to SelectVehicle with service: ${title}`);
      navigation.navigate(Routes.SelectVehicle, {selectedService: title});}}>
    <Image source={image} style={styles.serviceImage} />
    <Text style={styles.serviceText}>{title}</Text>
  </TouchableOpacity>
);

const ServiceSection = ({ title, services, navigation }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <View style={styles.servicesGrid}>
      {services.map((service, index) => (
        <ServiceCard key={index} {...service} navigation={navigation} />
      ))}
    </View>
  </View>
);

const SelectService = ({ navigation }) => {
  const bikeServices = [
    {
      title: 'Periodic Maintenance',
      image: require('../../../assets/images/icons8-service-100.png'),
    },
    {
      title: 'Oil Change',
      image: require('../../../assets/images/oil.png'),
    },
    {
      title: 'Brake Check',
      image: require('../../../assets/images/icons8-brake-discs-100.png'),
    },
    {
      title: 'Flar Tire',
      image: require('../../../assets/images/icons8-flat-tire-100.png'),
    },
    {
      title: 'Battery Jumpstart',
      image: require('../../../assets/images/icons8-car-battery-100.png'),
    },
  ];

  const carServices = [
    {
      title: 'Periodic Maintenance',
      image: require('../../../assets/images/appointment.png'),
    },
    {
      title: 'Oil Change',
      image: require('../../../assets/images/oil.png'),
    },
    {
      title: 'Brake & Clutch Check',
      image: require('../../../assets/images/icons8-brake-discs-100.png'),
    },
    {
      title: 'Flat Tire',
      image: require('../../../assets/images/icons8-flat-tire-100.png'),
    },
    {
      title: 'Battery Jumpstart',
      image: require('../../../assets/images/icons8-car-battery-100.png'),
    },
    {
      title: 'Car Spa & Detailing',
      image: require('../../../assets/images/icons8-car-wash-100.png'),
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
        <Text style={styles.headerTitle}>Schedule a Service</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ServiceSection title="Bike Services" services={bikeServices} navigation={navigation}/>
        <ServiceSection title="Car Services" services={carServices} navigation={navigation}/>
      </ScrollView>
    </View>
  );
};

export default SelectService;
