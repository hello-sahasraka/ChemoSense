import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

// NativeWind is used by applying className prop directly to standard RN components
// No need for styled HOCs with current NativeWind versions.
const StyledView = View;
const StyledText = Text;
const StyledTextInput = TextInput;
const StyledTouchableOpacity = TouchableOpacity;
const StyledImage = Image;

// Updated to use the provided logo
const Logo = () => (
  <StyledImage
    source={require('../../assets/images/HeartLogo 1.png')}
    className="w-24 h-24 self-center mb-6" // Adjust size as needed based on the actual logo dimensions
    resizeMode="contain"
  />
);

// Placeholder for visibility toggle icon
const EyeIcon = () => (
    <StyledText className="text-gray-500 text-lg">👁️</StyledText> // Simple emoji placeholder
);

const PatLogInScreen = () => {
  const [nic, setNic] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); // Example: "Incorrect username and password. Try again."

  const handleLogin = () => {
    // Basic validation
    if (!nic || !password) {
      setError('NIC and password are required.');
      return;
    }
    setError('');
    // Implement login logic here
    console.log('Login attempt with:', { nic, password, rememberMe });
  };

  return (
    <StyledView className="flex-1 bg-white">
      {/* Top Blue Section */}
      <StyledView className="bg-blue-600 h-1/3 items-center justify-center rounded-b-3xl">
        <Logo />
      </StyledView>

      {/* Form Section */}
      <StyledView className="flex-1 p-6 -mt-16 bg-white rounded-t-3xl">
        <StyledText className="text-3xl font-bold text-center mb-1">Welcome!</StyledText>
        <StyledText className="text-2xl font-bold text-blue-600 text-center mb-3">to CHEMOSENSE</StyledText>
        <StyledText className="text-center text-gray-600 mb-4">
          To keep connected with us login with your personal info
        </StyledText>

        {error ? (
          <StyledText className="text-red-500 text-center mb-3">{error}</StyledText>
        ) : null}

        <StyledTextInput
          className="bg-gray-200 p-4 rounded-lg mb-3 text-base"
          placeholder="NIC"
          value={nic}
          onChangeText={setNic}
          placeholderTextColor="#9CA3AF"
        />

        <StyledView className="flex-row items-center bg-gray-200 p-4 rounded-lg mb-3">
          <StyledTextInput
            className="flex-1 text-base"
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#9CA3AF"
          />
          <StyledTouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <EyeIcon />
          </StyledTouchableOpacity>
        </StyledView>

        <StyledView className="flex-row justify-between items-center mb-6">
          <StyledTouchableOpacity
            className="flex-row items-center"
            onPress={() => setRememberMe(!rememberMe)}
          >
            <StyledView
              className={`w-5 h-5 border-2 rounded mr-2 ${
                rememberMe ? 'bg-blue-600 border-blue-600' : 'border-gray-400'
              }`}
            />
            <StyledText className="text-gray-700">Remember me?</StyledText>
          </StyledTouchableOpacity>
          {/* Corrected href based on TS error hint */}
          <Link href="/Screens/ResetPasswordEnterNICScreen" asChild>
            <StyledTouchableOpacity>
              <StyledText className="text-blue-600 font-semibold">Forget Password?</StyledText>
            </StyledTouchableOpacity>
          </Link>
        </StyledView>

        <StyledTouchableOpacity
          className="bg-blue-600 p-4 rounded-lg items-center mb-6"
          onPress={handleLogin}
        >
          <StyledText className="text-white text-lg font-bold">Login</StyledText>
        </StyledTouchableOpacity>

        <StyledView className="items-center">
          <StyledText className="text-gray-600">Wanna visit our website?</StyledText>
          {/* Replace with actual link or navigation */}
          <StyledTouchableOpacity onPress={() => console.log('Navigate to website')}>
            <StyledText className="text-blue-600 font-semibold">here you are</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>
    </StyledView>
  );
};

export default PatLogInScreen;
