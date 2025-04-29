import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faLeaf,
   faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import {Routes} from '../../Navigation/Routes';

const MaintenanceOption = ({image, title, onPress}) => (
  <TouchableOpacity style={styles.maintenanceOption} onPress={onPress}>
    <Image source={image} style={styles.maintenanceImage} resizeMode="contain" />
    <Text style={styles.maintenanceTitle}>{title}</Text>
  </TouchableOpacity>
);

const EcoOptions = ({navigation}) => {
  const drivingTips = [
    'Drive smoothly to reduce fuel consumption.',
    'Maintain optimal tire pressure for better mileage.',
    'Turn off the engine when idling.',
    'Use cruise control for steady speed.',
  ];

  const alternativeFuelOptions = [
    'Switch to electric or hybrid vehicles.',
    'Use CNG or biofuels for lower emissions.',
    'Find nearby EV charging stations.',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faAngleLeft} size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Eco Options</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        {/* Eco-Friendly Driving Tips */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <FontAwesomeIcon icon={faLeaf} size={20} color="#4CAF50" />
            <Text style={styles.cardTitle}>Eco-Friendly Driving Tips</Text>
          </View>
          {drivingTips.map((tip, index) => (
            <View key={index} style={styles.tipContainer}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>

        {/* Green Vehicle Maintenance */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Options for Green Vehicle Maintenance
          </Text>
          <View style={styles.maintenanceGrid}>
            <MaintenanceOption
              image={require('../../assets/images/icons8-engine-oil-100.png')}
              title="Green Engine Oils"
              onPress={() => navigation.navigate(Routes.SelectVehicle, { selectedService: 'Green Engine Oils' } )}
            />
            <MaintenanceOption
              image={require('../../assets/images/icons8-automatic-car-wash-100.png')}
              title="Waterless Car Wash"
              onPress={() => navigation.navigate(Routes.SelectVehicle,{ selectedService: 'Waterless Car Wash' } )}
            />
            <MaintenanceOption
              image={require('../../assets/images/icons8-service-100.png')}
              title="Regular Servicing"
              onPress={() => navigation.navigate(Routes.SelectVehicle, { selectedService: 'Regular Servicing' })}
            />
          </View>
          {/*<Text style={styles.rewardsText}>*/}
          {/*  Use these Options to get rewards*/}
          {/*</Text>*/}
        </View>

        {/* Alternative Fuel Options */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Alternative Fuel Options</Text>
          {alternativeFuelOptions.map((option, index) => (
            <View key={index} style={styles.tipContainer}>
              <Text style={styles.bulletPoint}>•</Text>
              <Text style={styles.tipText}>{option}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  headerRight: {
    width: 24,
  },
  content: {
    flex: 1,
    padding: 16,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    marginBottom: 16,
  },
  tipContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    paddingRight: 16,
  },
  bulletPoint: {
    fontSize: 16,
    marginRight: 8,
    color: '#666',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  maintenanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  maintenanceOption: {
    alignItems: 'center',
    width: '30%',
  },
  maintenanceImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
  },
  maintenanceTitle: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
  rewardsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default EcoOptions;
