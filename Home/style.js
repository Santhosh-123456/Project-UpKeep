import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainContainer: {
    flex: 1,
    position: 'relative',
  },
  scrollContent: {
    flex: 1,
    // marginBottom: 60, // Height of bottom nav
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuButton: {
    padding: 8,
  },
  menuIcon: {
    width: 24,
  },
  menuLine: {
    height: 2,
    backgroundColor: '#000',
    marginVertical: 2,
  },
  searchBar: {
    flex: 1,
    height: 40,
    backgroundColor: '#f0f0f0',
    marginLeft: 16,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingHorizontal: 16,
  },
  overviewCard: {
    flexDirection: 'row',
    margin: 12,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  vehicleImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  vehicleDetails: {
    flex: 1,
    marginLeft: 16,
  },
  detailText: {
    marginVertical: 4,
  },
  calculatorButton: {
    backgroundColor: '#007AFF',
    margin: 16,
    marginTop: 4,
    marginBottom: 4,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  calculatorButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  healthSection: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scoreText: {
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    color: '#fff',
  },
  servicesSection: {
    paddingHorizontal: 16,
  },
  emergencyAssistance: {
    marginTop: -4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sosButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 4,
  },
  sosButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  serviceCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    width: '31%',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  bookService: {
    backgroundColor: '#FF7675',
  },
  findGarage: {
    backgroundColor: '#74B9FF',
  },
  serviceHistory: {
    backgroundColor: '#A29BFE',
  },
  cardTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  cardSubtext: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  recommendedSection: {
    paddingHorizontal: 16,
  },
  recommendedCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  recommendedCard: {
    width: '31%',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  ecoCard: {
    backgroundColor: '#00B894',
  },
  fuelCard: {
    backgroundColor: '#6C5CE7',
  },
  rewardsCard: {
    backgroundColor: '#FDCB6E',
  },
  recommendedTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  recommendedSubtext: {
    color: '#fff',
    fontSize: 12,
    marginTop: 4,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    backgroundColor: '#fff',
    height: 60,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
  },
  floatingEmergencyButton: {
    position: 'absolute',
    right: 16,
    bottom: 76, // Adjusted to be above the fixed nav bar
    backgroundColor: '#FF0000',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  emergencyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Add new styles for the horizontal scrolling booking cards
  ongoingBookingsSection: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  ongoingBookingsScroll: {
    alignItems: 'center',
  },
  bookingCardContainer: {
    paddingHorizontal: 8,
  },
  noBookingsText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    paddingVertical: 16,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    marginTop: 8,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginHorizontal: 4,
  },
});


export default styles;
