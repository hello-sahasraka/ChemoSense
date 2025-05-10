import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

// Assuming NativeWind is set up, use className prop directly
const StyledView = View;
const StyledText = Text;
const StyledImage = Image;

const Splashscreen = () => { // dont change file name 
  return (
    <StyledView className="flex-1 justify-center items-center bg-blue-600">
      <StyledImage
        source={require('../../assets/images/HeartLogo 1.png')}
        className="w-32 h-32 mb-4" // Adjust size as needed
        resizeMode="contain"
      />
      <StyledText className="text-white text-3xl font-bold">
        CHEMOSENSE
      </StyledText>
    </StyledView>
  );
};

export default Splashscreen;
