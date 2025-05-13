import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';
import { router, SplashScreen } from 'expo-router'; 
import { StatusBar } from 'expo-status-bar';
import "../global.css"; 

// Splash screen 
const SplashScreenContent = () => {
  return (
    <View style={{ backgroundColor: '#1330BE'}} className="flex-1 justify-center items-center ">
      <StatusBar style="light" backgroundColor="#1330BE" />
      <Image
        source={require('../assets/images/HeartLogo 1.png')} 
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
