import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    SafeAreaView, Alert,
} from 'react-native';
import { getAuth, signInWithPhoneNumber } from '@react-native-firebase/auth'; // Import Firebase Auth
import styles from './style';
import globalStyle from '../../assets/styles/globalStyle';
import {Routes} from '../../Navigation/Routes';
import {useAuth} from '../../context/AuthContext';
import LoginCarousel from '../../components/LoginCarousal/LoginCarousal';

const auth = getAuth();
const LoginScreen = ({navigation}) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const {setConfirm} = useAuth(); // Get setConfirm from context

    // Function to request OTP
    const handleGetOTP = async () => {
        if (!phoneNumber) {
            Alert.alert('Error', 'Please enter a phone number');
            return;
        }

        try {
            const confirmation = await signInWithPhoneNumber(auth,`+91${phoneNumber}`);
            setConfirm(confirmation);//Store confirm globally
            navigation.replace(Routes.EnterOtp, {phoneNumber: `+91${phoneNumber}`}); /*, { confirm: confirmation, phoneNumber });*/
        } catch (error) {
            Alert.alert('Error', 'Failed to send OTP. Please try again.');
            console.error(error);
        }
    };

    return (
            <SafeAreaView style={globalStyle.backgroundWhite}>
                <View style={styles.contentContainer}>
                    {/* Carousel Section */}
                    {/*<LoginCarousel />*/}
                    {/* Logo and Title */}
                    <View style={styles.logoContainer}>
                        <Image
                            source={require('../../assets/images/Logo-1.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.subtitle}>Maintenance Made Simple</Text>
                    </View>

                    {/* Login Form */}
                    <View style={styles.formContainer}>
                        <Text style={styles.loginTitle}>Login or Sign up</Text>

                        {/* Phone Input */}
                        <View style={styles.phoneInputContainer}>
                            <View style={styles.countryCode}>
                                <Image
                                    source={require('../../assets/images/india.png')}
                                    style={styles.flag}
                                />
                                <Text style={styles.countryCodeText}>+91</Text>
                            </View>
                            <TextInput
                                style={styles.phoneInput}
                                placeholder="Enter Phone Number"
                                placeholderTextColor="#888"   // 👈 Add this
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                keyboardType="phone-pad"
                            />
                        </View>

                        {/* OTP Button - Calls Firebase Function */}
                        <TouchableOpacity style={styles.otpButton} onPress={handleGetOTP}>
                            <Text style={styles.otpButtonText}>GET OTP</Text>
                        </TouchableOpacity>

                        {/*/!* OR Divider *!/*/}
                        {/*<View style={styles.dividerContainer}>*/}
                        {/*    <View style={styles.divider} />*/}
                        {/*    <Text style={styles.dividerText}>OR</Text>*/}
                        {/*    <View style={styles.divider} />*/}
                        {/*</View>*/}

                        {/*/!* Google Sign In *!/*/}
                        {/*<TouchableOpacity style={styles.googleButton}>*/}
                        {/*    <Image*/}
                        {/*        source={require('../../assets/images/google.png')}*/}
                        {/*        style={styles.googleIcon}*/}
                        {/*    />*/}
                        {/*    <Text style={styles.googleButtonText}>Google</Text>*/}
                        {/*</TouchableOpacity>*/}
                    </View>
                </View>
            </SafeAreaView>
    );
};


export default LoginScreen;
