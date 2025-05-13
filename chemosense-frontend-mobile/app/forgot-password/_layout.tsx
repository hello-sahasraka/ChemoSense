import { Stack } from 'expo-router';
import React from 'react';

export default function AppLayout() {
  return (
    <Stack>
      <Stack.Screen name="ResetPasswordEnterNICScreen" options={{ headerShown: false }} />
      
      <Stack.Screen name="ResetPasswordVerifyCodeScreen" options={{ headerShown: false }} />
      <Stack.Screen name="ResetPasswordSetNewScreen" options={{ headerShown: false }} />
    </Stack>
  );
}
