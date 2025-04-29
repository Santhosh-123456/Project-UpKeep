import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import API_BASE_URL from '../../config';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
   faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import {Routes} from '../../Navigation/Routes';
import {useAuth} from '../../context/AuthContext';

const MileageCalculator = ({navigation, route}) => {
  const { idToken } = useAuth();
  const [distance, setDistance] = useState('');
  const [fuelConsumed, setFuelConsumed] = useState('');
  const [results, setResults] = useState(null);
  const fuelPrice = 101; // Price per liter, can be made dynamic
  const avgMileage = route.params;
  const [showModal, setShowModal] = useState(false);

  const updateCalculatedMileage = async (mileage) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/update-calc-mileage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`, // Pass Firebase token
        },
        body: JSON.stringify({
          calcMileage: mileage,
        }),
      });

      const data = await response.json();
      console.log('Mileage updated:', data);
    } catch (error) {
      console.error('Error updating mileage:', error);
    }
  };

  const calculateMileage = () => {
    if (!distance || !fuelConsumed) {
      return;
    }

    const distanceNum = parseFloat(distance);
    const fuelNum = parseFloat(fuelConsumed);

    if (distanceNum <= 0 || fuelNum <= 0) {
      return;
    }

    const mileage = distanceNum / fuelNum; // km/l
    const fuelCostPerKm = (fuelPrice * fuelNum) / distanceNum;
    // const avgMileage = 20; // This can be made dynamic based on vehicle type

    // Calculate efficiency score (0-100)
    let efficiencyScore = (mileage / avgMileage) * 100;
    efficiencyScore = Math.min(Math.max(efficiencyScore, 0), 100);

    setResults({
      mileage: mileage.toFixed(2),
      fuelCostPerKm: fuelCostPerKm.toFixed(2),
      avgMileage: avgMileage.toFixed(2),
      efficiencyScore,
    });
    updateCalculatedMileage(mileage);

    if (efficiencyScore < 70) {
      setShowModal(true); // <-- Show the pop-up if efficiency is low
    }
  };

  const renderEfficiencyGauge = (score) => {
    let color;
    if (score < 33) {
      color = '#FF3B30'; // Red
    } else if (score < 66) {
      color = '#FFCC00'; // Yellow
    } else {
      color = '#4CAF50'; // Green
    }

    const rotation = (score / 100) * 180 - 90; // -90 to 90 degrees

    return (
      <View style={styles.gaugeContainer}>
        <View style={styles.gauge}>
          <View style={styles.gaugeBackground} />
          <View
            style={[
              styles.gaugeNeedle,
              {transform: [{rotate: `${rotation}deg`}]},
            ]}
          />
        </View>
        <View style={styles.gaugeLabels}>
          <Text style={[styles.gaugeLabel, {color: '#FF3B30'}]}>Low</Text>
          <Text style={[styles.gaugeLabel, {color: '#FFCC00'}]}>Med</Text>
          <Text style={[styles.gaugeLabel, {color: '#4CAF50'}]}>High</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faAngleLeft} size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Mileage Calculator</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.card}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Distance Travelled:</Text>
            <TextInput
              style={styles.input}
              value={distance}
              onChangeText={setDistance}
              placeholder="Enter distance in km"
              keyboardType="decimal-pad"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Fuel Consumed:</Text>
            <TextInput
              style={styles.input}
              value={fuelConsumed}
              onChangeText={setFuelConsumed}
              placeholder="Enter fuel in liters"
              keyboardType="decimal-pad"
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity
            style={styles.calculateButton}
            onPress={calculateMileage}>
            <Text style={styles.calculateButtonText}>Calculate</Text>
          </TouchableOpacity>
        </View>

        {results && (
          <View style={styles.card}>
            <Text style={styles.resultsTitle}>Results:</Text>

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Mileage:</Text>
              <Text style={styles.resultValue}>{results.mileage} km/l</Text>
            </View>

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Fuel Cost/km:</Text>
              <Text style={styles.resultValue}>₹{results.fuelCostPerKm}</Text>
            </View>

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Avg mileage of your vehicle:</Text>
              <Text style={styles.resultValue}>{results.avgMileage} km/l</Text>
            </View>

            <View style={styles.efficiencySection}>
              <Text style={styles.efficiencyTitle}>Fuel Efficiency Score</Text>
              {renderEfficiencyGauge(results.efficiencyScore)}
            </View>

            <TouchableOpacity
              style={styles.bookServiceButton}
              onPress={() => navigation.navigate(Routes.Services)}>
              <Text style={styles.bookServiceButtonText}>Book Service</Text>
            </TouchableOpacity>
          </View>
        )}

        <Modal
          transparent
          visible={showModal}
          animationType="fade"
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Your vehicle needs care!</Text>
              <Text style={styles.modalMessage}>
                Book a service to maintain your vehicle's health.
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, {backgroundColor: '#007AFF'}]}
                  onPress={() => {
                    setShowModal(false);
                    navigation.navigate(Routes.Services);
                  }}
                >
                  <Text style={styles.modalButtonText}>Book</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, {backgroundColor: '#ccc'}]}
                  onPress={() => setShowModal(false)}
                >
                  <Text style={[styles.modalButtonText, {color: '#333'}]}>Later</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

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
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  headerRight: {
    width: 24,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  calculateButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  resultLabel: {
    fontSize: 14,
    color: '#666',
  },
  resultValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  efficiencySection: {
    marginTop: 24,
    alignItems: 'center',
  },
  efficiencyTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  gaugeContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  gauge: {
    width: 200,
    height: 100,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  gaugeBackground: {
    position: 'absolute',
    bottom: 0,
    width: 200,
    height: 100,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
  },
  gaugeNeedle: {
    width: 4,
    height: 80,
    backgroundColor: '#333',
    borderRadius: 2,
    transform: [{rotate: '0deg'}],
    transformOrigin: 'bottom',
  },
  gaugeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 180,
    marginTop: 8,
  },
  gaugeLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  bookServiceButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 24,
  },
  bookServiceButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },

});

export default MileageCalculator;
