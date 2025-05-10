import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';

// Assuming NativeWind is set up, use className prop directly
const StyledView = View;
const StyledText = Text;
const StyledTextInput = TextInput;
const StyledTouchableOpacity = TouchableOpacity;

const ResetPasswordSetNewScreen = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleResetPassword = () => {
    if (!newPassword || !confirmPassword) {
      setError('Both password fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (newPassword.length < 6) { // Example: Basic password length validation
        setError('Password must be at least 6 characters long.');
        return;
    }
    setError('');
    // Implement actual password reset logic here
    console.log('Resetting password to:', newPassword);
    Alert.alert(
      "Password Reset",
      "Your password has been reset successfully.",
      [{ text: "OK", onPress: () => router.replace('/PatLogIn') }] // Updated path
    );
  };

  return (
    <StyledView className="flex-1 bg-gray-100 p-6 justify-center">
      <StyledText className="text-3xl font-bold text-blue-600 text-center mb-10">
        Reset your password
      </StyledText>

      {error ? (
        <StyledText className="text-red-500 text-center mb-4">{error}</StyledText>
      ) : null}

      <StyledTextInput
        className="bg-gray-200 p-4 rounded-lg mb-4 text-base"
        placeholder="New password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        placeholderTextColor="#9CA3AF"
      />

      <StyledTextInput
        className="bg-gray-200 p-4 rounded-lg mb-8 text-base"
        placeholder="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholderTextColor="#9CA3AF"
      />

      <StyledTouchableOpacity
        className="bg-blue-600 p-4 rounded-lg items-center"
        onPress={handleResetPassword}
      >
        <StyledText className="text-white text-lg font-bold">Reset</StyledText>
      </StyledTouchableOpacity>
    </StyledView>
  );
};

export default ResetPasswordSetNewScreen;
