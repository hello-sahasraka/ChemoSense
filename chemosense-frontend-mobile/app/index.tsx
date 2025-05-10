import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { router, SplashScreen } from 'expo-router'; // Import SplashScreen
import "../global.css"; // Corrected path for global.css

// Splash screen UI directly in index.tsx
const SplashScreenContent = () => {
  return (
    <View className="flex-1 justify-center items-center bg-blue-600">
      <Image
        source={require('../assets/images/HeartLogo 1.png')} // Corrected image path
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
    console.log("AppIndex: useEffect started");
    // Hide the native splash screen
    SplashScreen.hideAsync().catch(e => console.warn("SplashScreen.hideAsync Error:", e));

    const timer = setTimeout(() => {
      console.log("AppIndex: Navigating to PatLogIn");
      router.replace('/PatLogIn'); // Navigate to PatLogIn screen
    }, 4000); // 4 seconds

    return () => {
      console.log("AppIndex: useEffect cleanup");
      clearTimeout(timer);
    };
  }, []);

  console.log("AppIndex: Rendering SplashScreenContent");
  return <SplashScreenContent />;
};

export default AppIndex;
