import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, StatusBar } from 'react-native';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0A2BCB" />
      <Image
        source={require('../../assets/logo.png')} 
        style={styles.logo}
        resizeMode="contain" 
      />
      <Text style={styles.text}>CHEMOSENSE</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A2BCB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    letterSpacing: 2,
  },
});
