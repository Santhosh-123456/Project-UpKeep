
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    SafeAreaView, Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {Routes} from '../../Navigation/Routes';
import {useAuth} from '../../context/AuthContext';
import API_BASE_URL from '../../config';

const EnterOtpScreen = ({ navigation, route }) => {
  const phoneNumber = route.params?.phoneNumber || 'Unknown';
    const { confirm } = useAuth();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = Array(6).fill(0).map(() => React.createRef());

    const handleOtpChange = (value, index) => {
        if (value.length <= 1) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Move to next input if value is entered
            if (value !== '' && index < 5) {
                inputRefs[index + 1].current.focus();
            }
        }
    };

    const { setIdToken, setIsNewUser,setPhoneNumber, setRole } = useAuth(); // Get setIdToken from context

  // Handle OTP verification
    const handleVerifyOTP = async () => {
        const enteredOtp = otp.join('');
        if (enteredOtp.length !== 6) {
            Alert.alert('Error', 'Please enter a 6-digit OTP');
            return;
        }
        console.log(confirm);
        try {
          console.log('Confirm object:', confirm); // Check if confirm is valid.
            if (!confirm) {
                Alert.alert('Error', 'Verification session expired. Please request OTP again.');
                navigation.goBack();
                return;
            }
          console.log('Entered OTP:', enteredOtp);
          const credential = await confirm.confirm(enteredOtp);
          console.log('Firebase credential:', credential);
          const idToken = await credential.user.getIdToken(); // Get Firebase ID token
          console.log('Firebase ID Token',idToken);
          // Send ID token to backend
          console.log(API_BASE_URL);
          const response = await axios.post(`${API_BASE_URL}/auth/verify-otp`, {
            idToken,
          });
          console.log('Backend response:', response);
          const { isNewUser, user } = response.data;
          const { role } = user;
          console.log(isNewUser);
          console.log('User Role:', role);
          // Store token and user status in context
          await AsyncStorage.setItem('token', idToken);
          await AsyncStorage.setItem('role', role); // Store role in AsyncStorage
          // Retrieve it immediately to check if it's stored
          const storedToken = await AsyncStorage.getItem('token');
          console.log('Stored Token in AsyncStorage:', storedToken);
          setIdToken(idToken);
          setIsNewUser(isNewUser); // Set isNewUser state
          setPhoneNumber(response.data.user.phoneNumber);
          setRole(role); // Set role in context
          await AsyncStorage.setItem('phoneNumber', phoneNumber);
          if (isNewUser) {
            console.log('Navigating to PersonalDetails with phoneNumber:', response.data.user.phoneNumber);
            navigation.replace(Routes.PersonalDetails);
            }
          else {
            if (role === 'Admin') {
              navigation.replace(Routes.AdminDashboard);
            } else if (role === 'Mechanic') {
              navigation.replace(Routes.MechanicHome);
            } else {
              navigation.replace(Routes.Home);
            }
          }
            // await confirm.confirm(enteredOtp);
            // Alert.alert('Success', 'Phone number verified successfully!');
            // navigation.navigate(Routes.Home);
        } catch (error) {
            console.error('Error verifying OTP:', error);
            Alert.alert('Error', 'Invalid OTP. Please try again.');
        }
    };

    return (
      <SafeAreaView style={globalStyle.backgroundWhite}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: Routes.Login }],
            })}>
          <FontAwesomeIcon icon={faArrowLeft} size={20} />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.title}>
            We have sent a 6-digit OTP on{'\n'}
            <Text style={styles.phoneNumber}>{phoneNumber} {'\t'}</Text>
            <TouchableOpacity onPress={() => navigation.navigate(Routes.Login)}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </Text>

          <Text style={styles.subtitle}>
            Enter the OTP below to verify your number
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                style={styles.otpInput}
                value={digit}
                onChangeText={(value) => handleOtpChange(value, index)}
                keyboardType="numeric"
                maxLength={1}
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.continueButton}
            onPress={handleVerifyOTP}>
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
};


export default EnterOtpScreen;
