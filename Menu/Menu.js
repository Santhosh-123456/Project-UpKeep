import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar, ScrollView, Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-regular-svg-icons';
import {
  faAngleRight,
  faArrowLeft,
  faPen,
} from '@fortawesome/free-solid-svg-icons';
import {Routes} from '../../Navigation/Routes';

const MenuScreen = ({ navigation, route }) => {
  const { logout, phoneNumber, username } = useAuth();
  console.log(`phoneNumber: ${phoneNumber} ${username}`);
  const nav = useNavigation(); // For navigation
  const userName = route.params || '';


  const handleLogout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to logout?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            await logout(); // Remove token
            nav.reset({
              index: 0,
              routes: [{ name: 'Login' }], // Navigate to Login screen
            });
          },
        },
      ],
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View>
          <FontAwesomeIcon icon={faArrowLeft} size={18}/>
          </View>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Menu</Text>
      </View>

      {/* Profile Section */}
      <TouchableOpacity
        style={styles.profileSection}
        onPress={() => {
          return navigation.navigate(Routes.PersonalDetails, {isEditing: true});
        }}>
        <View style={styles.profileIcon}>
          <FontAwesomeIcon icon={faUser} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.username}>{username || userName || 'User'}</Text>
          <Text style={styles.phoneNumber}>{phoneNumber}</Text>
        </View>
        <FontAwesomeIcon icon={faPen} />
      </TouchableOpacity>

      {/* My Account Section */}
      <ScrollView>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>My Account</Text>
          <TouchableOpacity style={styles.menuItem} onPress={()=>navigation.navigate(Routes.MyVehicle)}>
            <Text style={styles.menuItemText}>My Vehicle</Text>
            <FontAwesomeIcon icon={faAngleRight} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={()=>navigation.navigate(Routes.BookingHistory)}>
            <Text style={styles.menuItemText}>My Bookings</Text>
            <FontAwesomeIcon icon={faAngleRight} />
          </TouchableOpacity>
          {/*<TouchableOpacity style={styles.menuItem} onPress={()=>navigation.navigate(Routes.ESSelectVehicle)}>*/}
          {/*  <Text style={styles.menuItemText}>Emergency Assistance</Text>*/}
          {/*  <FontAwesomeIcon icon={faAngleRight} />*/}
          {/*</TouchableOpacity>*/}
          {/*<TouchableOpacity style={styles.menuItem} onPress={()=>navigation.navigate(Routes.LocationSearch)}>*/}
          {/*  <Text style={styles.menuItemText}>Nearby Service Locator</Text>*/}
          {/*  <FontAwesomeIcon icon={faAngleRight} />*/}
          {/*</TouchableOpacity>*/}
          {/*<TouchableOpacity style={styles.menuItem}>*/}
          {/*  <Text style={styles.menuItemText}>Help and Support</Text>*/}
          {/*  <FontAwesomeIcon icon={faAngleRight} />*/}
          {/*</TouchableOpacity>*/}
          <TouchableOpacity style={styles.menuItem} onPress={()=>navigation.navigate(Routes.Eco)}>
            <Text style={styles.menuItemText}>Explore Eco Options</Text>
            <FontAwesomeIcon icon={faAngleRight} />
          </TouchableOpacity>
          {/*<TouchableOpacity style={styles.menuItem} onPress={()=>navigation.navigate(Routes.MileageCalculator)}>*/}
          {/*  <Text style={styles.menuItemText}>Mileage Calculator</Text>*/}
          {/*  <FontAwesomeIcon icon={faAngleRight} />*/}
          {/*</TouchableOpacity>*/}
          <TouchableOpacity style={styles.menuItem} onPress={()=>navigation.navigate(Routes.FuelTracker)}>
            <Text style={styles.menuItemText}>Fuel Tracker</Text>
            <FontAwesomeIcon icon={faAngleRight} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.signOutButton} onPress={handleLogout}>
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Fixed Navigation Bar */}
      {/*<View style={styles.bottomNav}>*/}
      {/*  <TouchableOpacity style={styles.navItem} onPress={()=>navigation.navigate(Routes.Home)}>*/}
      {/*    <FontAwesomeIcon icon={faHome} />*/}
      {/*    <Text style={styles.navText}>Home</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*  <TouchableOpacity style={styles.navItem} onPress={()=>navigation.navigate(Routes.Services)}>*/}
      {/*    <FontAwesomeIcon icon={faScrewdriverWrench} />*/}
      {/*    <Text style={styles.navText}>Service</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*  <TouchableOpacity style={styles.navItem} onPress={()=>navigation.navigate(Routes.LocationSearch)}>*/}
      {/*    <FontAwesomeIcon icon={faLocation} />*/}
      {/*    <Text style={styles.navText}>Locator</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*  <TouchableOpacity style={styles.navItem} onPress={()=>navigation.navigate(Routes.MyVehicle)}>*/}
      {/*    <FontAwesomeIcon icon={faCar} />*/}
      {/*    <Text style={styles.navText}>Vehicles</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*  <TouchableOpacity style={styles.navItem} onPress={()=>navigation.navigate(Routes.Eco)}>*/}
      {/*    <FontAwesomeIcon icon={faLeaf} />*/}
      {/*    <Text style={styles.navText}>Eco</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}
      {/* Floating Emergency Button */}
      {/*<TouchableOpacity style={styles.floatingEmergencyButton} onPress={()=>navigation.navigate(Routes.ES)}>*/}
      {/*  <Text style={styles.emergencyButtonText}>Emergency</Text>*/}
      {/*</TouchableOpacity>*/}
    </SafeAreaView>
  );
};


export default MenuScreen;
