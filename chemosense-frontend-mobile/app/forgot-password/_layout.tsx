import { Stack } from 'expo-router';
import React from 'react';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="PatLogIn" options={{ title: 'Login', headerShown: false }} />
      
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
    </Stack>
  );
}
