import { Stack } from 'expo-router';
import React from 'react';

export default function DashboardLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ title: 'Dashboard' }} />
      <Stack.Screen name="Notification" options={{ title: 'Notifications' }} />
      <Stack.Screen name="PatEditProfile" options={{ title: 'Edit Profile' }} />
      {/* Add other dashboard-specific screens here */}
    </Stack>
  );
}
