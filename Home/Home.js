import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import styles from './style';
import API_BASE_URL from '../../config';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import {Routes} from '../../Navigation/Routes';
import {useAuth} from '../../context/AuthContext';
import OngoingBookingCard from '../../components/OngoingBookings/OngoingBookings';
import {useFocusEffect} from '@react-navigation/native';

const Home = ({navigation}) => {
  const [vehicleData, setVehicleData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ongoingBooking, setOngoingBooking] = useState([]);
  const { idToken } = useAuth();
  const [healthScore, setHealthScore] = useState(100);

  const calculateUpcomingServiceDate = (lastService, vehicleType) => {
    if (!lastService) {
      return 'N/A';
    }

    const lastServiceDate = new Date(lastService);
    let monthsToAdd = 0;

    if (vehicleType?.toLowerCase() === 'motorcycle') {
      monthsToAdd = 6;
    } else if (vehicleType?.toLowerCase() === 'car') {
      monthsToAdd = 12;
    } else {
      return 'N/A'; // Or some other default if the type is unknown
    }

    lastServiceDate.setMonth(lastServiceDate.getMonth() + monthsToAdd);

    // Format the date to YYYY-MM-DD
    const year = lastServiceDate.getFullYear();
    const month = String(lastServiceDate.getMonth() + 1).padStart(2, '0');
    const day = String(lastServiceDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  useFocusEffect(
    useCallback(() => {
    const fetchVehicleDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/vehicle-details`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${idToken}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (response.ok) {
          setVehicleData({
            name: `${data.vehicle.manufacturer} ${data.vehicle.model}`,
            model: data.vehicle.year,
            fuelType: data.vehicle.fuelType,
            lastServiceDate: data.vehicle.lastServiceDate ? data.vehicle.lastServiceDate.split('T')[0] : 'Not Available',
            upcomingServiceDate: calculateUpcomingServiceDate(data.vehicle.lastServiceDate, data.vehicle.vehicleType),
            vehicleType: data.vehicle.vehicleType || 'unknown', // Get vehicleType
            userName: data.userName,
            Mileage: data.vehicle.Mileage,
            calcMileage: data.vehicle.calcMileage,
          });
        } else {
          console.error('Error fetching vehicle data:', data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    const fetchOngoingBookings = async () => {
      try {
        const emergencyResponse = await fetch(`${API_BASE_URL}/emergency/ongoing`, {
          headers: {
            'Authorization': `Bearer ${idToken}`,
            'Content-Type': 'application/json',
          },
        });

        const scheduleResponse = await fetch(`${API_BASE_URL}/schedule/ongoing`, {
          headers: {
            'Authorization': `Bearer ${idToken}`,
            'Content-Type': 'application/json',
          },
        });

        const emergencyData = await emergencyResponse.json();
        const scheduleData = await scheduleResponse.json();
        console.log(scheduleData);
        console.log(emergencyData);

        // Filter out only accepted bookings
        const filteredEmergencyBookings = (emergencyData.booking || []).filter(
          booking => booking.status === 'Accepted'
        );
        const filteredScheduleBookings = (scheduleData.booking || []).filter(
          booking => booking.status === 'Accepted'
        );
        // Combine both lists of bookings
        const combinedBookings = [
          ...filteredEmergencyBookings,
          ...filteredScheduleBookings,
        ];
        console.log(combinedBookings);
        setOngoingBooking(combinedBookings);
      } catch (error) {
        console.error('Error fetching ongoing bookings:', error);
      }
    };
    fetchOngoingBookings();
    fetchVehicleDetails();
  }, [])
);

  // Choose image based on vehicleType
  const motorcycleImages = {
    'Honda Activa': require('../../assets/images/vehicles/motorcycle/Activa.png'),
    'Honda CB350': require('../../assets/images/vehicles/motorcycle/CB350.jpg'),
    'Honda CB500X': require('../../assets/images/vehicles/motorcycle/CB500X.jpg'),
    'Yamaha FZ': require('../../assets/images/vehicles/motorcycle/FZ.jpeg'),
    'Yamaha R15': require('../../assets/images/vehicles/motorcycle/R15.jpeg'),
    'Royal Enfield Classic 350': require('../../assets/images/vehicles/motorcycle/Classic350.jpg'),
    'Yamaha Fascino': require('../../assets/images/vehicles/motorcycle/Fascino.jpg'),
    'Royal Enfield Himalayan': require('../../assets/images/vehicles/motorcycle/Himalayan.jpg'),
    'Royal Enfield Meteor': require('../../assets/images/vehicles/motorcycle/Meteor.jpeg'),
    'Yamaha MT-15': require('../../assets/images/vehicles/motorcycle/MT-15.jpg'),
    'Honda Shine': require('../../assets/images/vehicles/motorcycle/Shine.jpg'),
    'Honda Unicorn': require('../../assets/images/vehicles/motorcycle/Unicorn.jpeg'),
    // Add more motorcycle models here
  };

  const carImages = {
    'Maruti Suzuki Brezza': require('../../assets/images/vehicles/car/Brezza.jpeg'),
    'Tata Altroz': require('../../assets/images/vehicles/car/Altroz.jpg'),
    'Hyundai Creta': require('../../assets/images/vehicles/car/Creta.jpeg'),
    'Hyundai i20': require('../../assets/images/vehicles/car/i20.jpg'),
    'Maruti Suzuki Ertiga': require('../../assets/images/vehicles/car/Ertiga.jpg'),
    'Tata Harrier': require('../../assets/images/vehicles/car/Harrier.jpg'),
    'Tata Nexon': require('../../assets/images/vehicles/car/Nexon.webp'),
    'Tata Safari': require('../../assets/images/vehicles/car/Safari.webp'),
    'Maruti Suzuki Swift': require('../../assets/images/vehicles/car/Swift.webp'),
    'Hyundai Venue': require('../../assets/images/vehicles/car/Venue.webp'),
    // Add more car models here
  };

  const vehicleImages = {
    motorcycle: motorcycleImages,
    car: carImages,
  };

  const defaultImage = require('../../assets/images/applogo.png');

  const getVehicleImage = () => {
    if (!vehicleData) {
      return defaultImage;
    }

    const { vehicleType, name } = vehicleData;
    const type = vehicleType?.toLowerCase();

    if (vehicleImages[type] && vehicleImages[type][name]) {
      return vehicleImages[type][name];
    } else {
      return defaultImage;
    }
  };
  useEffect(() => {
    if (vehicleData && ongoingBooking) {
      // Assume you have fuelLogs data too (like from AsyncStorage or API)
      const fakeFuelLogs = []; // For now empty, later real data
      const score = calculateHealthScore(vehicleData, fakeFuelLogs, ongoingBooking);
      setHealthScore(score);
    }
  }, [vehicleData, ongoingBooking]);

  const calculateHealthScore = (vehicleData, fuelLogs, emergencyBookings) => {
    let score = 100;
    const now = new Date();

    console.log(`Starting Health Score: ${score}`);

    // 1. Service Recency
    if (vehicleData.lastServiceDate) {
      const lastService = new Date(vehicleData.lastServiceDate);
      const monthsSinceService = (now.getFullYear() - lastService.getFullYear()) * 12 + (now.getMonth() - lastService.getMonth());
      if (monthsSinceService > 12) {
        console.log('-30: Last service over 12 months ago');
        score -= 30;
      } else if (monthsSinceService > 6) {
        console.log('-15: Last service between 6-12 months ago');
        score -= 15;
      }
    } else {
      console.log('-30: Last service date unknown');
      score -= 30;
    }

    // 2. Mileage
    if (vehicleData.Mileage !== undefined && vehicleData.Mileage !== null) {
      if (vehicleData.Mileage > 100000) {
        console.log('-25: Mileage over 100,000 km');
        score -= 25;
      } else if (vehicleData.Mileage > 50000) {
        console.log('-10: Mileage over 50,000 km');
        score -= 10;
      }
    } else {
      console.log('-10: Mileage unknown');
      score -= 10;
    }

    // 3. Model Year Age
    if (vehicleData.model) { // <-- Fixed typo here (was "vehicleData.model" by mistake)
      const modelYear = parseInt(vehicleData.modelYear);
      const vehicleAge = now.getFullYear() - modelYear;

      if (vehicleAge >= 6 && vehicleAge <= 8) {
        console.log('-10: Vehicle age 6-8 years');
        score -= 10;
      } else if (vehicleAge >= 4 && vehicleAge <= 5) {
        console.log('-7: Vehicle age 4-5 years');
        score -= 7;
      } else if (vehicleAge >= 2 && vehicleAge <= 3) {
        console.log('-5: Vehicle age 2-3 years');
        score -= 5;
      } else if (vehicleAge > 8) {
        console.log('-20: Vehicle age > 8 years');
        score -= 20;
      }
    } else {
      console.log('-5: Vehicle model year unknown');
      score -= 5;
    }

    // 4. Emergency Service Usage
    const recentEmergency = emergencyBookings.filter(b => {
      const bookingDate = new Date(b.createdAt);
      const diffInDays = (now - bookingDate) / (1000 * 60 * 60 * 24);
      return diffInDays <= 60; // within 2 months
    });
    if (recentEmergency.length > 0) {
      console.log('-10: Emergency service used in last 2 months');
      score -= 10;
    }

    // 5. Upcoming Service Due
    if (vehicleData.upcomingServiceDate) {
      const nextService = new Date(vehicleData.upcomingServiceDate);
      if (now > nextService) {
        console.log('-20: Upcoming service date overdue');
        score -= 20;
      }
    }

    // 6. calcMileage vs Mileage check
    if (vehicleData.calcMileage !== 0 && vehicleData.Mileage !== undefined) {
      const calcMileagePercent = (vehicleData.calcMileage / vehicleData.Mileage) * 100;
      console.log(`calcMileagePercent: ${calcMileagePercent}%`);

      if (calcMileagePercent <= 60) {
        console.log('-60: calcMileage is less than or equal to 60% of Mileage');
        score -= 60;
      } else if (calcMileagePercent <= 80) {
        console.log('-15: calcMileage is between 60%-80% of Mileage');
        score -= 15;
      } else if (calcMileagePercent <= 90) {
        console.log('-10: calcMileage is between 80%-90% of Mileage');
        score -= 10;
      }
      // If >90%, no penalty
    }

    const finalScore = Math.max(0, score);
    console.log(`Final Health Score: ${finalScore}`);
    return finalScore;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <ScrollView style={styles.scrollContent}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate(Routes.Menu, vehicleData.userName)}>
              <View style={styles.menuIcon} >
                <FontAwesomeIcon icon={faBars}  size={18}/>
              </View>
            </TouchableOpacity>
            <Text style={[styles.title,{paddingVertical:6}]}>Welcome! {vehicleData?.userName || 'User'}</Text>
            {/*<View style={styles.searchBar} />*/}
          </View>

          <Text style={[styles.sectionTitle, {paddingHorizontal: 16}]}>Vehicle Overview</Text>

          <View style={styles.overviewCard}>
            <Image
              style={styles.vehicleImage} source={getVehicleImage()}
            />
            <View style={styles.vehicleDetails}>
              <Text style={styles.detailText}>Name:{vehicleData?.name || 'N/A'}</Text>
              <Text style={styles.detailText}>Model:{vehicleData?.model || 'N/A'}</Text>
              <Text style={styles.detailText}>Fuel Type:{vehicleData?.fuelType || 'N/A'} </Text>
              <Text style={styles.detailText}>Last Service: {vehicleData?.lastServiceDate || 'N/A'}</Text>
              <Text style={styles.detailText}>Next Service: {vehicleData?.upcomingServiceDate || 'N/A'}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.calculatorButton} onPress={()=> navigation.navigate(Routes.MileageCalculator,vehicleData.Mileage)}>
            <Text style={styles.calculatorButtonText}>Mileage Calculator</Text>
          </TouchableOpacity>

          <View style={styles.healthSection}>
            <Text style={styles.sectionTitle}>Health Status</Text>
            <View style={styles.healthDetails}>
              <Text>Health Score: <Text style={styles.scoreText}>{healthScore}/100</Text></Text>
              <View style={styles.statusContainer}>
                <Text>Health Status: </Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor:
                      healthScore > 80 ? '#4CAF50' :    // Green
                        healthScore > 60 ? '#FFC107' :    // Amber
                          healthScore > 40 ? '#FF9800' :    // Orange
                            '#F44336',                        // Red
                  },
                ]}>
                  <Text style={styles.statusText}>
                    {healthScore > 80 ? 'Excellent' :
                      healthScore > 60 ? 'Good' :
                        healthScore > 40 ? 'Needs Attention' : 'Critical'}
                  </Text>
                </View>
              </View>
            </View>
          </View>


          <View style={styles.servicesSection}>
            <Text style={styles.sectionTitle}>Services</Text>
            <View style={styles.emergencyAssistance}>
              <Text style={styles.assistanceText}>For Emergency roadside Assistance</Text>
            </View>

            <View style={styles.serviceCards}>
              <TouchableOpacity style={[styles.serviceCard, styles.bookService]} onPress={()=>navigation.navigate(Routes.Services)}>
                <Text style={styles.cardTitle}>Book a Service →</Text>
                <Text style={styles.cardSubtext}>At your doorstep</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.serviceCard, styles.findGarage]} onPress={()=>navigation.navigate(Routes.LocationSearch)}>
                <Text style={styles.cardTitle}>Find Nearby Garage →</Text>
                <Text style={styles.cardSubtext}>Click to locate</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.serviceCard, styles.serviceHistory]} onPress={()=>navigation.navigate(Routes.BookingHistory)}>
                <Text style={styles.cardTitle}>View Service History→</Text>
                <Text style={styles.cardSubtext}>Click to view</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.recommendedSection}>
            <Text style={styles.sectionTitle}>Recommended</Text>
            <View style={styles.recommendedCards}>
              <TouchableOpacity style={[styles.recommendedCard, styles.ecoCard]} onPress={()=>navigation.navigate(Routes.Eco)}>
                <Text style={styles.recommendedTitle}>Eco Services→</Text>
                <Text style={styles.recommendedSubtext}>Go eco-friendly</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.recommendedCard, styles.fuelCard]} onPress={()=>navigation.navigate(Routes.FuelTracker)}>
                <Text style={styles.recommendedTitle}>Fuel Consumption Tracker→</Text>
                <Text style={styles.recommendedSubtext}>Monthly stats</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[styles.recommendedCard, styles.rewardsCard]} onPress={()=>navigation.navigate(Routes.Rewards)}>
                <Text style={styles.recommendedTitle}>Rewards→</Text>
                <Text style={styles.recommendedSubtext}>Loyalty points</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/*/!* Floating Emergency Button *!/*/}
        {/*<TouchableOpacity style={styles.floatingEmergencyButton} onPress={()=>navigation.navigate(Routes.ESSelectVehicle)}>*/}
        {/*  <Text style={styles.emergencyButtonText}>Emergency</Text>*/}
        {/*</TouchableOpacity>*/}

        {ongoingBooking.length > 0 && (
          <View>
            {ongoingBooking.map((booking, index) => (
              <OngoingBookingCard
                key={index}
                booking={booking}
                onPress={() => {
                  if (booking.service === 'emergency-service') {
                    navigation.navigate(Routes.MechanicFound, { requestId: booking._id,latitude: booking.location.latitude,longitude: booking.location.longitude });
                  } else {
                    navigation.navigate('BookingDetails', { booking });
                  }
                }}
              />
            ))}
          </View>
        )}
         {/*Fixed Navigation Bar*/}
        {/*<View style={styles.bottomNav}>*/}
        {/*  <TouchableOpacity style={styles.navItem}>*/}
        {/*    <FontAwesomeIcon icon={faHome} />*/}
        {/*    <Text style={styles.navText}>Home</Text>*/}
        {/*  </TouchableOpacity>*/}
        {/*  <TouchableOpacity style={styles.navItem} onPress={()=>navigation.navigate(Routes.Services)}>*/}
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
        {/*    <Text style={styles.navText} >Eco</Text>*/}
        {/*  </TouchableOpacity>*/}
        {/*</View>*/}
      </View>
    </SafeAreaView>
  );
};


export default Home;
