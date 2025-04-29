import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faHome,
  faWrench,
  faLocationDot,
  faBicycle,
  faLeaf,
  faBars,
  faGasPump,
  faCalendarAlt, faAngleLeft,
} from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Routes} from '../../Navigation/Routes';

const FuelTracker = ({navigation}) => {
  const [fuelEntries, setFuelEntries] = useState([]);
  const [newEntry, setNewEntry] = useState({
    liters: '',
    cost: '',
    date: new Date().toISOString().split('T')[0],
  });
  const [totalSpent, setTotalSpent] = useState(0);
  const [averageCost, setAverageCost] = useState(0);

  useEffect(() => {
    loadFuelEntries();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [fuelEntries]);

  const loadFuelEntries = async () => {
    try {
      const entries = await AsyncStorage.getItem('fuelEntries');
      if (entries) {
        setFuelEntries(JSON.parse(entries));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to load fuel entries');
    }
  };

  const saveFuelEntries = async (entries) => {
    try {
      await AsyncStorage.setItem('fuelEntries', JSON.stringify(entries));
    } catch (error) {
      Alert.alert('Error', 'Failed to save fuel entry');
    }
  };

  const calculateStats = () => {
    const total = fuelEntries.reduce((sum, entry) => sum + parseFloat(entry.cost), 0);
    setTotalSpent(total);
    setAverageCost(total / (fuelEntries.length || 1));
  };

  const handleAddEntry = () => {
    if (!newEntry.liters || !newEntry.cost) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const entry = {
      ...newEntry,
      id: Date.now().toString(),
      costPerLiter: (parseFloat(newEntry.cost) / parseFloat(newEntry.liters)).toFixed(2),
    };

    const updatedEntries = [entry, ...fuelEntries];
    setFuelEntries(updatedEntries);
    saveFuelEntries(updatedEntries);
    setNewEntry({
      liters: '',
      cost: '',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleDeleteEntry = (id) => {
    Alert.alert(
      'Delete Entry',
      'Are you sure you want to delete this entry?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedEntries = fuelEntries.filter(entry => entry.id !== id);
            setFuelEntries(updatedEntries);
            saveFuelEntries(updatedEntries);
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faAngleLeft} size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Fuel Tracker</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        {/* Add New Entry */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Add Fuel Entry</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Liters Filled:</Text>
            <TextInput
              style={styles.input}
              value={newEntry.liters}
              onChangeText={(text) => setNewEntry({...newEntry, liters: text})}
              placeholder="Enter liters"
              keyboardType="decimal-pad"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Total Cost:</Text>
            <TextInput
              style={styles.input}
              value={newEntry.cost}
              onChangeText={(text) => setNewEntry({...newEntry, cost: text})}
              placeholder="Enter amount"
              keyboardType="decimal-pad"
              placeholderTextColor="#999"
            />
          </View>

          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddEntry}>
            <Text style={styles.addButtonText}>Add Entry</Text>
          </TouchableOpacity>
        </View>

        {/* Statistics */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Fuel Statistics</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Total Spent</Text>
              <Text style={styles.statValue}>₹{totalSpent.toFixed(2)}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Average Cost</Text>
              <Text style={styles.statValue}>₹{averageCost.toFixed(2)}</Text>
            </View>
          </View>
        </View>

        {/* Recent Entries */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Entries</Text>
          {fuelEntries.map((entry) => (
            <TouchableOpacity
              key={entry.id}
              style={styles.entryItem}
              onLongPress={() => handleDeleteEntry(entry.id)}>
              <View style={styles.entryMain}>
                <FontAwesomeIcon icon={faGasPump} size={20} color="#666" />
                <View style={styles.entryDetails}>
                  <Text style={styles.entryText}>{entry.liters}L @ ₹{entry.costPerLiter}/L</Text>
                  <Text style={styles.entryDate}>
                    <FontAwesomeIcon icon={faCalendarAlt} size={12} color="#999" />
                    {' '}{entry.date}
                  </Text>
                </View>
              </View>
              <Text style={styles.entryCost}>₹{entry.cost}</Text>
            </TouchableOpacity>
          ))}
          {fuelEntries.length === 0 && (
            <Text style={styles.noEntriesText}>No fuel entries yet</Text>
          )}
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
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
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
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#007AFF',
  },
  entryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  entryMain: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  entryDetails: {
    marginLeft: 12,
  },
  entryText: {
    fontSize: 14,
    color: '#333',
  },
  entryDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  entryCost: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  noEntriesText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 14,
    marginTop: 8,
  },
});

export default FuelTracker;
