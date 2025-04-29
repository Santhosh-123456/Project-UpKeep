import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    marginLeft: 40,
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 500,
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 8,
  },
  vehicleCard: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  vehicleImage: {
    width: 150,
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 15,
  },
  vehicleDetails: {
    gap: 10,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 16,
    color: '#666',
    width: 160,
  },
  detailValue: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  nextButton: {
    backgroundColor: '#007AFF',
    marginHorizontal: 20,
    marginTop: 20,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  orText: {
    marginHorizontal: 10,
    color: '#666',
    fontSize: 16,
  },
  otherVehicleButton: {
    backgroundColor: '#f5f5f5',
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  otherVehicleText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  noVehicleText: { textAlign: 'center', fontSize: 16, color: '#666', marginTop: 20 },
});

export default styles;
