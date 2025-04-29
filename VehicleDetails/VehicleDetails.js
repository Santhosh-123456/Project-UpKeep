import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import {useAuth} from '../../context/AuthContext';
import { Picker } from '@react-native-picker/picker';
import styles from './style';
import {Routes} from '../../Navigation/Routes';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft, faChevronDown} from '@fortawesome/free-solid-svg-icons';
import API_BASE_URL from '../../config';
import axios from 'axios';
import DatePicker from 'react-native-date-picker';


const VehicleDetails = ({ navigation }) => {
  const { idToken } = useAuth();
  const [selectedVehicleType, setSelectedVehicleType] = useState(null);
  const [manufacturer, setManufacturer] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [lastServiceDate, setLastServiceDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const years = [];
  for (let i = new Date().getFullYear(); i >= 2000; i--) {
    years.push(i.toString());
  }


  // Sample data for manufacturers and models
  const manufacturers = {
    motorcycle: ['Honda', 'Yamaha', 'Royal Enfield'],
    car: ['Maruti Suzuki', 'Hyundai', 'Tata'],
  };

  const models = {
    'Honda': ['Activa', 'Shine', 'Unicorn', 'CB350', 'CB500X'],
    'Yamaha': ['FZ', 'R15', 'MT-15', 'Fascino'],
    'Royal Enfield': ['Classic 350', 'Meteor', 'Himalayan'],
    'Maruti Suzuki': ['Swift', 'Brezza', 'Ertiga'],
    'Hyundai': ['i20', 'Venue', 'Creta'],
    'Tata': ['Nexon', 'Harrier', 'Safari', 'Altroz'],
  };

  const handleSubmit = async () => {
    try {
      const vehicleData = {
        vehicleType: selectedVehicleType,
        manufacturer,
        model,
        year,
        fuelType,
        lastServiceDate,
      };
      const response = await axios.post(
        `${API_BASE_URL}/auth/vehicle-details`,
        vehicleData,
        {
          headers: {
            Authorization: `Bearer ${idToken}`, // Send token for authentication
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('Response:', response.data);
      alert('Vehicle details saved successfully!');
      navigation.reset({ index: 0, routes: [{ name: Routes.Home }] });
    } catch (error) {
      console.error('Error saving vehicle details:', error);
      alert('Failed to save vehicle details.');
    }
    console.log({
      vehicleType: selectedVehicleType,
      manufacturer,
      model,
      year,
      fuelType,
      lastServiceDate,
    });
    navigation.navigate(Routes.Home);
  };

  const getModels = () => {
    if (!manufacturer) { return [];}
    if (models[manufacturer]) {
      return selectedVehicleType === 'motorcycle'
        ? models[manufacturer].motorcycle || models[manufacturer]
        : models[manufacturer].car || models[manufacturer];
    }
    return [];
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faAngleLeft} size={20} style={{marginRight: 16}} />
        </TouchableOpacity>
        <Text style={styles.title}>Vehicle Details</Text>
      </View>

      <Text style={styles.sectionTitle}>Vehicle Type</Text>
      <View style={styles.vehicleTypeContainer}>
        <TouchableOpacity
          style={[
            styles.vehicleTypeButton,
            selectedVehicleType === 'motorcycle' && styles.selectedType,
          ]}
          onPress={() => {
            setSelectedVehicleType('motorcycle');
            setManufacturer('');
            setModel('');
          }}
        >
          <Image
            source={require('../../assets/images/bike.jpg')}
            style={styles.vehicleIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.vehicleTypeButton,
            selectedVehicleType === 'car' && styles.selectedType,
          ]}
          onPress={() => {
            setSelectedVehicleType('car');
            setManufacturer('');
            setModel('');
          }}
        >
          <Image
            source={require('../../assets/images/car.jpg')}
            style={styles.vehicleIcon}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Choose Manufacturer</Text>
      <View style={styles.dropdownButton}>
        <Picker
          selectedValue={manufacturer}
          onValueChange={(value) => {
            setManufacturer(value);
            setModel('');
          }}
          enabled={selectedVehicleType !== null}
          style={[styles.dropdownText, !manufacturer && styles.placeholderText]}
          dropdownIconColor="#666"
          mode="dropdown"
          theme={{
            colors: {
              background: '#FFFFFF',
              text: '#FFFFFF',
            },
          }}
        >
          <Picker.Item label="Select Manufacturer" value="" color="#999" />
          {selectedVehicleType && manufacturers[selectedVehicleType].map((mfr) => (
            <Picker.Item key={mfr} label={mfr} value={mfr} color="#fff" />
          ))}
        </Picker>
        {/*<FontAwesomeIcon icon={faChevronDown} size={16} color="#666" />*/}
      </View>

      <Text style={styles.sectionTitle}>Choose Model</Text>
      <View style={styles.dropdownButton}>
        <Picker
          selectedValue={model}
          onValueChange={setModel}
          enabled={manufacturer !== ''}
          style={[styles.dropdownText, !model && styles.placeholderText]}
          dropdownIconColor="#666"
          mode="dropdown"
          theme={{
            colors: {
              background: '#FFFFFF',
              text: '#FFFFFF',
            },
          }}
        >
          <Picker.Item label="Select Model" value="" color="#999" />
          {getModels().map((mdl) => (
            <Picker.Item key={mdl} label={mdl} value={mdl} color="#fff" />
          ))}
        </Picker>
        {/*<FontAwesomeIcon icon={faChevronDown} size={16} color="#666" />*/}
      </View>

      <Text style={styles.sectionTitle}>Year of Manufacture</Text>
      <View style={styles.dropdownButton}>
        <Picker
          selectedValue={year}
          onValueChange={(value) => setYear(value)}
          style={[styles.dropdownText, !year && styles.placeholderText]}
          dropdownIconColor="#666"
          mode="dropdown"
        >
          <Picker.Item label="Select Year" value="" color="#999" />
          {years.map((year) => (
            <Picker.Item label={year} value={year} key={year} color="#fff" />
          ))}
        </Picker>
      </View>


      <Text style={styles.sectionTitle}>Select Fuel Type</Text>
      <View style={styles.fuelTypeContainer}>
        {['Petrol', 'Diesel'].map((type) => {
          const isDieselDisabled = selectedVehicleType === 'motorcycle' && type === 'Diesel';
          return (
            <TouchableOpacity
              key={type}
              style={[
                styles.fuelTypeButton,
                fuelType === type && styles.selectedFuelType,
                isDieselDisabled && { backgroundColor: '#ccc' }, // greyed out if disabled
              ]}
              onPress={() => {
                if (!isDieselDisabled) {
                  setFuelType(type);
                }
              }}
              disabled={isDieselDisabled}
            >
              <Text
                style={[
                  styles.fuelTypeText,
                  fuelType === type && styles.selectedFuelTypeText,
                  isDieselDisabled && { color: '#666' }, // greyed out text if disabled
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.sectionTitle}>Last Service Date</Text>
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={{ color: lastServiceDate ? '#000' : '#999' }}>
          {lastServiceDate || 'Select Last Service Date'}
        </Text>
      </TouchableOpacity>

      <DatePicker
        modal
        open={showDatePicker}
        date={lastServiceDate ? new Date(lastServiceDate) : new Date()}
        mode="date"
        maximumDate={new Date()} // Optional: can't pick future dates
        onConfirm={(selectedDate) => {
          setShowDatePicker(false);
          const formattedDate = selectedDate.toISOString().split('T')[0];
          setLastServiceDate(formattedDate);
        }}
        onCancel={() => {
          setShowDatePicker(false);
        }}
      />


      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default VehicleDetails;
