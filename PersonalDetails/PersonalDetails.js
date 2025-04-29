import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView, Alert,
} from 'react-native';
import axios from 'axios';
import {useAuth} from '../../context/AuthContext';
import styles from './style';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Routes} from '../../Navigation/Routes';
import { useRoute } from '@react-navigation/native';
import API_BASE_URL from '../../config';

const PersonalDetailsScreen = ({ navigation }) => {
  const { idToken,setUsername,saveUserData, logout } = useAuth();
  const route = useRoute();
  const { isEditing } = route.params || {}; // Get isEditing from navigation params

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');

  // Fetch existing user data if editing
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        const userData = response.data;
        console.log(response);
        setName(userData.name || '');
        setGender(userData.gender || '');
        setEmail(userData.email || '');
      } catch (error) {
        console.error('Error fetching user data:', error);
        // If Firebase token expired, navigate to Log in screen
        if (error.response?.data?.error === 'auth/id-token-expired') {
          logout(); // Clear token from AuthContext
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        }
      }
    };

    if (isEditing && idToken) {
      fetchUserDetails().catch(error => {
        console.error('Unexpected error while fetching details:', error);
      });
    }
  }, [isEditing, idToken, navigation,logout]);


  const handleNext = async () => {
    if (!name || !email || !gender) {
      Alert.alert('Please fill all fields');
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/personal-details`,
        { name, gender, email },
        {
          headers: {
            Authorization: `Bearer ${idToken}`, // Send token in headers
          },
        }
      );
      // Save to AsyncStorage
      await saveUserData(name, email); // ✅ Storing username and email
      setUsername(name);
      console.log('Response:', response.data);

      if (isEditing) {
        Alert.alert('Details updated successfully!');
        navigation.goBack(); // Go back to Menu after updating
      } else {
        navigation.navigate(Routes.VehicleDetails); // Move to next screen
      }
    } catch (error) {
      console.error('Error:', error);
      // If token expired, redirect to log in
      if (error.response?.data?.error === 'auth/id-token-expired') {
        logout();
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      } else {
        Alert.alert('Failed to submit details');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faArrowLeft} size={18}/>
        </TouchableOpacity>
        <Text style={styles.title}>    {isEditing ? 'Update Details' : 'Personal Details'}</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>What's your name?</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            placeholderTextColor="#999" // Set a visible placeholder color
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderButtons}>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === 'Male' && styles.selectedGender,
              ]}
              onPress={() => setGender('Male')}>
              <Text
                style={[
                  styles.genderButtonText,
                  gender === 'Male' && styles.selectedGenderText,
                ]}>
                Male
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === 'Female' && styles.selectedGender,
              ]}
              onPress={() => setGender('Female')}>
              <Text
                style={[
                  styles.genderButtonText,
                  gender === 'Female' && styles.selectedGenderText,
                ]}>
                Female
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.genderButton,
                gender === 'Others' && styles.selectedGender,
              ]}
              onPress={() => setGender('Others')}>
              <Text
                style={[
                  styles.genderButtonText,
                  gender === 'Others' && styles.selectedGenderText,
                ]}>
                Others
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            placeholderTextColor="#999" // Set a visible placeholder color
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>
          {isEditing ? 'Save Changes' : 'Next'}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PersonalDetailsScreen;
