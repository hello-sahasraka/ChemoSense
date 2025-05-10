import { Stack } from 'expo-router';
import React from 'react';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="PatLogIn" options={{ title: 'Login', headerShown: false }} />
      {/* Add other root level screens here as they are created/moved */}
      {/* For example, the forgot password flow will be nested or defined here */}
      <Stack.Screen name="forgot-password" options={{ headerShown: false }} />
      <Stack.Screen name="dashboard" options={{ headerShown: false }} />
    </Stack>
  );
}
