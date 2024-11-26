import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(auth)/login" options={{ title: 'Login', headerShown: false }} />
      <Stack.Screen name="home/index" options={{ title: 'Home' }} />
      <Stack.Screen name="checkin/CameraScannerTest" options={{ title: 'Scanner' }} />
    </Stack>
  );
}
