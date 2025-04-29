import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import styles from './style';
import axios from 'axios';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft, faLocation, faStar} from '@fortawesome/free-solid-svg-icons';
import API_BASE_URL from '../../../config';
import {Routes} from '../../../Navigation/Routes';

// Mock data for service centers
// const serviceCenters = [
//   {
//     id: '1',
//     name: 'AutoCare Service Center',
//     distance: '2.5 km',
//     rating: 4.5,
//     address: '123 Main Street, Chennai',
//     isOpen: true,
//   },
//   {
//     id: '2',
//     name: 'Quick Fix Auto Service',
//     distance: '3.2 km',
//     rating: 4.2,
//     address: '456 Park Road, Chennai',
//     isOpen: true,
//   },
//   {
//     id: '3',
//     name: 'Premium Car Care',
//     distance: '4.1 km',
//     rating: 4.8,
//     address: '789 Lake View, Chennai',
//     isOpen: false,
//   },
// ];

const NearbyCenters = ({navigation, route}) => {
  const { latitude, longitude, selectedLocation} = route.params;
  const [serviceCenter, setServiceCenter] = useState([]);

  const getStatusColor = isOpen => (isOpen ? '#34C759' : '#FF3B30');


  // Fetch Nearby Service Centers from Backend
useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/service-center/nearby?lat=${latitude}&lng=${longitude}`,
        );
        console.log('Fetched Data:', response.data.nearbyCenters); // 👈 Add this
        setServiceCenter(response.data.nearbyCenters);
      } catch (error) {
        console.error('Error fetching service centers:', error);
      }
    })();
  }, [latitude, longitude]);


  const renderServiceCenter = ({item}) => (
    <TouchableOpacity style={styles.centerCard}
    onPress={() => navigation.navigate(Routes.CenterDetails, { centerId: item._id })}>
      <Image
        source={require('../../../assets/images/logo.png')}
        style={styles.centerImage}
      />
      <View style={styles.centerInfo}>
        <Text style={styles.centerName}>{item.name}</Text>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>4.5</Text>{/*{item.rating}*/}
          <FontAwesomeIcon icon={faStar} color="gold"/>
          {/*<Text style={styles.distance}>10 ratings</Text>*/}
        </View>
          <Text style={styles.distance}>• {item.distance} km</Text>
        <Text style={styles.address}>{item.address}</Text>
        <Text style={[styles.status, { color: getStatusColor(item.isOpen) }]}>
          {item.isOpen ? 'Open Now' : 'Closed'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon={faAngleLeft} size={24} color="#333"/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Nearby Service Centers</Text>
      </View>

      {/* Location Bar */}
      <View style={styles.locationBar}>
        <FontAwesomeIcon icon={faLocation} size={20} color="#666"/>
        <Text style={styles.locationText}>{selectedLocation}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      </View>

      {/* Service Centers List */}
      <FlatList
        data={serviceCenter}
        renderItem={renderServiceCenter}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.listContainer}
      />

      {/* Emergency Button */}
      {/*<TouchableOpacity style={styles.emergencyButton} onPress={()=>navigation.navigate(Routes.CenterDetails)}>*/}
      {/*  <Text style={styles.emergencyText}>Emergency</Text>*/}
      {/*</TouchableOpacity>*/}
    </SafeAreaView>
  );
};

export default NearbyCenters;
