import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginBottom: 16,
  },
  menuButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dateScrollView: {
    maxHeight: 80,
    marginBottom: 20,
  },
  dateContainer: {
    paddingRight: 16,
  },
  dateButton: {
    width: 60,
    height: 70,
    marginRight: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedDateButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  dayText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  selectedDateText: {
    color: '#fff',
  },
  timeContainer: {
    flex: 1,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  timeSlot: {
    width: '30%',
    height: 40,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedTimeSlot: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  timeText: {
    fontSize: 14,
    color: '#000',
  },
  selectedTimeText: {
    color: '#fff',
  },
  proceedButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },
  proceedButtonDisabled: {
    backgroundColor: '#ccc',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default styles;
