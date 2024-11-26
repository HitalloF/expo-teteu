import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa as telas
import LoginScreen from '../(auth)/login';
import HomeScreen from '../home/index'; // Tela 
import CameraScannerTest from '../checkin/CameraScannerTest';

const Stack = createNativeStackNavigator();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      {/* Tela de Login */}
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ title: 'Login', headerShown: true }} 
      />

      {/* Tela Principal (Home) */}
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Home', headerShown: true }} 
      />

  <Stack.Screen
    name="CameraScannerTest"
    component={CameraScannerTest}
    options={{ title: 'Scanner' }}
  />
   
    </Stack.Navigator>
  );
};

export default AuthNavigator;
