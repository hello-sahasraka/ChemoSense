import { View } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import "../global.css";

// Default screen shown when app loads
import PatHomeScreen from './Screens/PatHomescreen';

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    // After 30 seconds, go to PatLogIn screen
    const timer = setTimeout(() => {
      router.push('/Screens/PatLogIn');
    }, 4000); // 30000 milliseconds = 30 seconds

    return () => clearTimeout(timer); // Clean up timer if component unmounts
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <PatHomeScreen />
    </View>
  );
};

export default Index;
