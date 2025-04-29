import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  locationBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  locationText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  changeText: {
    color: '#007AFF',
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  centerCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  centerImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  centerInfo: {
    flex: 1,
  },
  centerName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    marginLeft: 4,
    marginRight: 8,
  },
  distance: {
    color: '#666',
  },
  address: {
    color: '#666',
    fontSize: 14,
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: '500',
  },
  emergencyButton: {
    position: 'absolute',
    right: 16,
    bottom: 80,
    backgroundColor: '#ff6b6b',
    padding: 12,
    borderRadius: 25,
  },
  emergencyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
  },
  navItem: {
    alignItems: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    color: '#666',
  },
});

export default styles;
