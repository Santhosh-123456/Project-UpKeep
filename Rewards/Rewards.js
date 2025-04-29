import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faAngleLeft, faCheckCircle, faStar} from '@fortawesome/free-solid-svg-icons';
import {Routes} from '../../Navigation/Routes';

const Rewards = ({navigation}) => {
  // Dummy data - Replace with your API data
  const rewardPoints = 750;
  const rewards = [
    {
      id: '1',
      title: 'Free Oil Change',
      points: 1000,
      description: 'Get a free oil change service for your vehicle',
      // validUntil: '2025-04-30',
      image: require('../../assets/images/oil.png'), // Add this image to your assets
    },
    {
      id: '2',
      title: '50% Off Car Wash',
      points: 500,
      description: 'Get 50% off on premium car wash service',
      // validUntil: '2025-04-15',
      image: require('../../assets/images/icons8-car-wash-100.png'), // Add this image to your assets
    },
  ];

  const renderRewardCard = (reward) => (
    <View key={reward.id} style={styles.rewardCard}>
      <Image source={reward.image} style={styles.rewardImage} />
      <View style={styles.rewardContent}>
        <Text style={styles.rewardTitle}>{reward.title}</Text>
        <Text style={styles.rewardDescription}>{reward.description}</Text>
        <View style={styles.rewardFooter}>
          <Text style={styles.pointsText}>{reward.points} points</Text>
          <TouchableOpacity
            style={[
              styles.redeemButton,
              {opacity: rewardPoints >= reward.points ? 1 : 0.5},
            ]}
            disabled={rewardPoints < reward.points}
            onPress={() => navigation.navigate(Routes.Services)}

          >
            <Text style={styles.redeemButtonText}>Redeem</Text>
          </TouchableOpacity>
        </View>
        {/*<Text style={styles.validityText}>Valid until {reward.validUntil}</Text>*/}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faAngleLeft} size={24} color="#000"/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rewards</Text>
        <View style={{width: 24}} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.pointsCard}>
          <View style={styles.pointsHeader}>
            <FontAwesomeIcon icon={faStar} size={24} color="#FFD700"/>
            <Text style={styles.pointsTitle}>Your Points</Text>
          </View>
          <Text style={styles.pointsValue}>{rewardPoints}</Text>
          <Text style={styles.pointsSubtext}>
            Earn points with every service booking
          </Text>
        </View>

        <View style={styles.rewardsSection}>
          <Text style={styles.sectionTitle}>Available Rewards</Text>
          {rewards.map(renderRewardCard)}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>How to Earn Points</Text>
          <View style={styles.infoItem}>
            <FontAwesomeIcon icon={faCheckCircle} size={20} color="#4CD964"/>
            <Text style={styles.infoText}>Book a service: 100 points</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesomeIcon icon={faCheckCircle} size={20} color="#4CD964"/>
            <Text style={styles.infoText}>Complete a service: 50 points</Text>
          </View>
          <View style={styles.infoItem}>
            <FontAwesomeIcon icon={faCheckCircle} size={20} color="#4CD964"/>
            <Text style={styles.infoText}>Rate your experience: 25 points</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pointsCard: {
    margin: 16,
    padding: 20,
    backgroundColor: '#007AFF',
    borderRadius: 12,
    alignItems: 'center',
  },
  pointsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pointsTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  pointsValue: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  pointsSubtext: {
    color: '#fff',
    opacity: 0.8,
  },
  rewardsSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  rewardCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  rewardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  rewardContent: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  rewardDescription: {
    color: '#666',
    fontSize: 14,
    marginBottom: 8,
  },
  rewardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  pointsText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  redeemButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  redeemButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  validityText: {
    fontSize: 12,
    color: '#666',
  },
  infoSection: {
    padding: 16,
    backgroundColor: '#F8F8F8',
    margin: 16,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infoText: {
    color: '#666',
  },
});

export default Rewards;
