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
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  basicInfo: {
    padding: 16,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  ratingText: {
    color: '#fff',
    marginRight: 4,
  },
  starIcon: {
    fontSize: 12,
  },
  ratingCount: {
    marginLeft: 8,
    color: '#666',
  },
  verifiedText: {
    marginTop: 8,
    color: '#4CAF50',
  },
  typeText: {
    marginTop: 4,
    color: '#666',
  },
  openingTime: {
    marginTop: 4,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
  actionButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  tabSection: {
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  tabsContainer: {
    flexGrow: 0,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4CAF50',
  },
  tabText: {
    color: '#666',
  },
  activeTabText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  contentScrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  priceCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    marginBottom: 12,
  },
  serviceName: {
    fontSize: 16,
    marginBottom: 4,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  viewAllButton: {
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginTop: 8,
  },
  viewAllText: {
    color: '#666',
  },
  serviceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkmark: {
    color: '#4CAF50',
    marginRight: 8,
  },
  serviceText: {
    color: '#333',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    color: '#666',
    marginBottom: 12,
  },
  directionCopyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  directionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
