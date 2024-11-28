import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="(auth)/login" options={{ title: 'Login' }} />
      <Stack.Screen name="home/index" options={{ title: 'Home' }} />
      <Stack.Screen name="checkin/CameraScannerTest.tsx" options={{ title: 'Checkin' }} />
      <Stack.Screen name="palestra/[id]/register" options={{ title: 'Registerpalestra' }} />
      <Stack.Screen name="partner/[id]/register" options={{ title: 'Registerpartner' }} />
      <Stack.Screen name="partner/[id]/checkin" options={{ title: 'Checkin' }} />
    </Stack>
  );
}
