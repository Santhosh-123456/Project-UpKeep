import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  logo: {
    width: 200,
    height: 200,
  },
  tagline: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  button: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  emergencyButton: {
    backgroundColor: '#FF3B30',
  },
  scheduleButton: {
    backgroundColor: '#FFD700',
  },
  garageButton: {
    backgroundColor: '#34C759',
  },
  emergencyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  scheduleButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  garageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 10,
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
});

export default styles;
