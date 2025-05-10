import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

// Assuming NativeWind is set up, use className prop directly
const StyledView = View;
const StyledText = Text;
const StyledTextInput = TextInput;
const StyledTouchableOpacity = TouchableOpacity;

const ResetPasswordVerifyCodeScreen = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');

  const handleVerify = () => {
    if (!verificationCode) {
      setError('Verification code is required.');
      return;
    }
    if (verificationCode.length !== 4) { // Assuming a 4-digit code
        setError('Verification code must be 4 digits.');
        return;
    }
    setError('');
    // Navigate to the next screen (Set New Password)
    // Assuming ResetPasswordSetNewScreen will be a route
    router.push('/Screens/ResetPasswordSetNewScreen' as any);
    console.log('Verify with code:', verificationCode);
  };

  return (
    <StyledView className="flex-1 bg-gray-100 p-6 justify-center">
      <StyledText className="text-3xl font-bold text-blue-600 text-center mb-6">
        Reset your password
      </StyledText>

      <StyledTextInput
        className="bg-gray-200 p-4 rounded-lg mb-4 text-base text-center"
        placeholder="Enter verification code"
        value={verificationCode}
        onChangeText={setVerificationCode}
        keyboardType="number-pad"
        maxLength={4} // Assuming a 4-digit code
        placeholderTextColor="#9CA3AF"
      />

      <StyledText className="text-center text-gray-600 mb-8">
        We have sent a four digital code to your phone
      </StyledText>

      {error ? (
        <StyledText className="text-red-500 text-center mb-4">{error}</StyledText>
      ) : null}

      <StyledTouchableOpacity
        className="bg-blue-600 p-4 rounded-lg items-center"
        onPress={handleVerify}
      >
        <StyledText className="text-white text-lg font-bold">Verify</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default ResetPasswordVerifyCodeScreen;
