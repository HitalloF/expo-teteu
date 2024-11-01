// navigation/AuthNavigator.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../app/(auth)/login';
import RegistrationScreen from '../app/(auth)/register';
import HomeScreen from '../app/(home)/HomeScreen'; // ou HomeScreen, dependendo do seu nome de arquivo
import EventDetailsScreen from '../app/screens/(events)/[id]'; // Importa a tela de detalhes do evento

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegistrationScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      
    </Stack.Navigator>
  );
};

export default AuthNavigator;
