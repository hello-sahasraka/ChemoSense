import { Stack } from 'expo-router';
import React from 'react';

export default function ForgotPasswordLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ResetPasswordEnterNICScreen" options={{ title: 'Enter NIC' }} />
      <Stack.Screen name="ResetPasswordVerifyCodeScreen" options={{ title: 'Verify Code' }} />
      <Stack.Screen name="ResetPasswordSetNewScreen" options={{ title: 'Set New Password' }} />
    </Stack>
  );
}
