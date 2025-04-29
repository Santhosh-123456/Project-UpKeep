import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backButton: {
        padding: 16,
    },
    backButtonText: {
        fontSize: 24,
        color: '#000',
    },
    content: {
        flex: 1,
        paddingHorizontal: 24,
    },
    title: {
        fontSize: 18,
        color: '#000',
        marginBottom: 8,
        lineHeight: 26,
    },
    phoneNumber: {
        fontWeight: 'bold',
        marginRight: 10,
    },
    editText: {
        color: '#007AFF',
        textDecorationLine: 'underline',
        fontSize: 16,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 32,
    },
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    otpInput: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 8,
        fontSize: 24,
        textAlign: 'center',
        backgroundColor: '#FFF',
    },
    continueButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    continueButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default styles;
