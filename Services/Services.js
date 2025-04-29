import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import styles from './style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCar, faHome, faLeaf, faLocation, faScrewdriverWrench} from '@fortawesome/free-solid-svg-icons';
import {Routes} from '../../Navigation/Routes';

const Services = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.tagline}>Maintenance Made Simple</Text>
      </View>

      {/* Main Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.emergencyButton]}
          onPress={() => navigation.navigate(Routes.ESSelectVehicle)}>
          <Text style={styles.emergencyButtonText}>
            Emergency Roadside Assistance
          </Text>
        </TouchableOpacity>

        <Text style={styles.orText}>OR</Text>

        <TouchableOpacity
          style={[styles.button, styles.scheduleButton]}
          onPress={() => navigation.navigate(Routes.SelectService)}>
          <Text style={styles.scheduleButtonText}>Schedule a Service</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>OR</Text>

        <TouchableOpacity
          style={[styles.button, styles.garageButton]}
          onPress={() => navigation.navigate(Routes.LocationSearch)}>
          <Text style={styles.garageButtonText}>Find Garage Nearby</Text>
        </TouchableOpacity>
      </View>
      {/* Fixed Navigation Bar */}
      {/*<View style={styles.bottomNav}>*/}
      {/*  <TouchableOpacity style={styles.navItem} onPress={() => navigation.navigate(Routes.Home)}>*/}
      {/*    <FontAwesomeIcon icon={faHome} />*/}
      {/*    <Text style={styles.navText}>Home</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*  <TouchableOpacity style={styles.navItem}>*/}
      {/*    <FontAwesomeIcon icon={faScrewdriverWrench}/>*/}
      {/*    <Text style={styles.navText}>Service</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*  <TouchableOpacity style={styles.navItem} onPress={()=>navigation.navigate(Routes.LocationSearch)}>*/}
      {/*    <FontAwesomeIcon icon={faLocation}/>*/}
      {/*    <Text style={styles.navText}>Locator</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*  <TouchableOpacity style={styles.navItem} onPress={()=>navigation.navigate(Routes.MyVehicle)}>*/}
      {/*    <FontAwesomeIcon icon={faCar}/>*/}
      {/*    <Text style={styles.navText}>Vehicles</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*  <TouchableOpacity style={styles.navItem} onPress={()=>navigation.navigate(Routes.Eco)}>*/}
      {/*    <FontAwesomeIcon icon={faLeaf}/>*/}
      {/*    <Text style={styles.navText}>Eco</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}
    </SafeAreaView>
  );
};

export default Services;
