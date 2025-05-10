import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';

// Assuming NativeWind is set up, use className prop directly
const StyledView = View;
const StyledText = Text;
const StyledTextInput = TextInput;
const StyledTouchableOpacity = TouchableOpacity;

// Placeholder for Close icon
const CloseIcon = () => (
  <StyledText className="text-black text-2xl font-bold">X</StyledText>
);

const ResetPasswordEnterNICScreen = () => {
  const [nic, setNic] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!nic || !phoneNumber) {
      setError('NIC and Phone number are required.');
      return;
    }
    setError('');
    // Navigate to the next screen (Verify Code)
    // Corrected path to include /Screens/ prefix
    router.push('/Screens/ResetPasswordVerifyCodeScreen'); 
    console.log('Continue with:', { nic, phoneNumber });
  };

  const handleClose = () => {
    // Navigate back to login or previous screen
    if (router.canGoBack()) {
      router.back();
    } else {
      // Corrected path to include /Screens/ prefix
      router.replace('/Screens/PatLogInScreen'); // Fallback to login
    }
  };

  return (
    <StyledView className="flex-1 bg-gray-100 p-6 justify-center">
      <StyledTouchableOpacity onPress={handleClose} className="absolute top-16 right-6 z-10">
        <CloseIcon />
      </StyledTouchableOpacity>

      <StyledText className="text-3xl font-bold text-blue-600 text-center mb-10">
        Reset your password
      </StyledText>

      {error ? (
        <StyledText className="text-red-500 text-center mb-4">{error}</StyledText>
      ) : null}

      <StyledTextInput
        className="bg-gray-200 p-4 rounded-lg mb-4 text-base"
        placeholder="NIC"
        value={nic}
        onChangeText={setNic}
        placeholderTextColor="#9CA3AF"
      />

      <StyledTextInput
        className="bg-gray-200 p-4 rounded-lg mb-8 text-base"
        placeholder="Phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        placeholderTextColor="#9CA3AF"
      />

      <StyledTouchableOpacity
        className="bg-blue-600 p-4 rounded-lg items-center"
        onPress={handleContinue}
      >
        <StyledText className="text-white text-lg font-bold">Continue</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default ResetPasswordEnterNICScreen;
