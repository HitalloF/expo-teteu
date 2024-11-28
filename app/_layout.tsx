import { Stack } from 'expo-router';
import React from 'react';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}> {/* Oculta o cabeçalho globalmente */}
      <Stack.Screen name="(auth)/login" />
      <Stack.Screen name="home/index" />
      <Stack.Screen name="checkin/CameraScannerTest.tsx" />
      <Stack.Screen name="palestra/[id]/register" />
      <Stack.Screen name="partner/[id]/register" />
      <Stack.Screen name="partner/[id]/checkin" />
    </Stack>
  );
}
