import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { router } from 'expo-router';
import "../../global.css"; // Assuming your global.css is one level up from 'app'

// Splash screen UI directly in index.tsx
const SplashScreenContent = () => {
  return (
    <View className="flex-1 justify-center items-center bg-blue-600">
      <Image
        source={require('../../assets/images/HeartLogo 1.png')}
        className="w-32 h-32 mb-4"
        resizeMode="contain"
      />
      <Text className="text-white text-3xl font-bold">
        CHEMOSENSE
      </Text>
    </View>
  );
};

const AppIndex = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/PatLogIn'); // Navigate to PatLogIn screen
    }, 4000); // 4 seconds

    return () => clearTimeout(timer);
  }, []);

  return <SplashScreenContent />;
};

export default AppIndex;
