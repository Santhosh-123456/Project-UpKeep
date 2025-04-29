import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    logo: {
        width: 200,
        height: 100,
    },
    subtitle: {
        fontSize: 18,
        color: '#333',
        marginTop: 10,
        fontWeight: 'bold',
    },
    formContainer: {
        width: '100%',
    },
    loginTitle: {
        fontSize: 20,
        fontWeight: 500,
        textAlign: 'center',
        marginBottom: 30,
    },
    phoneInputContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 20,
        overflow: 'hidden',
    },
    countryCode: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRightWidth: 1,
        borderRightColor: '#ddd',
        backgroundColor: '#ffffff',
    },
    flag: {
        width: 24,
        height: 16,
        marginRight: 5,
    },
    countryCodeText: {
        fontSize: 16,
        fontWeight: 600,
    },
    phoneInput: {
        flex: 1,
        padding: 15,
        fontSize: 16,
    },
    otpButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    otpButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#ddd',
    },
    dividerText: {
        marginHorizontal: 10,
        color: '#666',
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#fff',
    },
    googleIcon: {
        width: 25,
        height: 25,
        marginRight: 10,
    },
    googleButtonText: {
        fontSize: 16,
        color: '#333',
        fontWeight: 500,
    },
    mechanicsLink: {
        marginTop: 20,
        alignItems: 'center',
    },
    mechanicsText: {
        color: '#007AFF',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
});

export default styles;
