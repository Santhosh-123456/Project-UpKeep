import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity, ActivityIndicator,
} from 'react-native';
import styles from './style';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import API_BASE_URL from '../../../config';

const CenterDetails = ({ route, navigation }) => {
  const { centerId } = route.params;
  const [centerDetails, setCenterDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Summary');
  const tabs = ['Summary', 'Reviews', 'Services', 'Quick Info'];

  // Fetch service center details
  useEffect(() => {
    const fetchCenterDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/service-center/${centerId}`);
        setCenterDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching service center details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCenterDetails();
  }, [centerId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!centerDetails) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Service center details not found.</Text>
      </View>
    );
  }

  // Render Header
  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <FontAwesomeIcon icon={faAngleLeft} size={20} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Details</Text>
    </View>
  );

  const renderBasicInfo = () => (
    <View style={styles.basicInfo}>
      <Text style={styles.name}>{centerDetails.name}</Text>
      <View style={styles.ratingContainer}>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{centerDetails.ratings.average || 'N/A'}</Text>
          <Text style={styles.starIcon}>⭐</Text>
        </View>
        <Text style={styles.ratingCount}>{centerDetails.ratings.totalReviews || 0} Ratings</Text>
      </View>
      <Text style={styles.verifiedText}>{centerDetails.verified ? 'Verified' : 'Not Verified'}</Text>
      <Text style={styles.typeText}>{centerDetails.type || 'General Service'}</Text>
      <Text style={styles.openingTime}>Opens at {centerDetails.workingHours.monday.open || 'Unknown'}</Text>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton}>
          <Text>Direction</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text>Review</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderTabs = () => (
    <View style={styles.tabSection}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
      >
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab,
            ]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[
              styles.tabText,
              activeTab === tab && styles.activeTabText,
            ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderContent = () => {
    switch (activeTab) {
      // case 'Price List':
      //   return (
      //     <ScrollView style={styles.contentScrollView}>
      //       <View style={styles.contentContainer}>
      //         <View style={styles.priceCard}>
      //           <Text style={styles.serviceName}>Car Wash Service</Text>
      //           <Text style={styles.price}>Rs.250</Text>
      //         </View>
      //         <View style={styles.priceCard}>
      //           <Text style={styles.serviceName}>Car Wash Service</Text>
      //           <Text style={styles.price}>Rs.250</Text>
      //         </View>
      //         <TouchableOpacity style={styles.viewAllButton}>
      //           <Text style={styles.viewAllText}>View All</Text>
      //         </TouchableOpacity>
      //       </View>
      //     </ScrollView>
      //   );
      case 'Services':
        return (
          <ScrollView style={styles.contentScrollView}>
            <View style={styles.contentContainer}>
              {centerDetails.services?.map((service, index) => (
                <View key={index} style={styles.serviceItem}>
                  <Text style={styles.checkmark}>✓</Text>
                  <Text style={styles.serviceText}>{service}</Text>
                </View>
              ))}
            </View>
          </ScrollView>
        );
      case 'Quick Info':
        return (
          <ScrollView style={styles.contentScrollView}>
            <View style={styles.contentContainer}>
              <Text style={styles.infoTitle}>Address</Text>
              <Text style={styles.infoText}>{centerDetails.address}</Text>
              <View style={styles.directionCopyContainer}>
                <TouchableOpacity style={styles.directionButton}>
                  <Text>Direction</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.copyButton}>
                  <Text>Copy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        );
      default:
        return (
          <ScrollView style={styles.contentScrollView}>
            <View style={styles.contentContainer}>
              <Text>Summary Content</Text>
            </View>
          </ScrollView>
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderHeader()}
      {renderBasicInfo()}
      {renderTabs()}
      {renderContent()}
    </View>
  );
};

export default CenterDetails;
