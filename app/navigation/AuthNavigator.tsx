import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../(auth)/login';
import HomeScreen from '../home';
import Checkin from '../palestra/[id]/checkin'
import PalestraRegister from '../palestra/[id]/register'
import PartnerRegister from '../partner/[id]/register'

const Stack = createNativeStackNavigator();

const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Checkin" component={Checkin} />
    <Stack.Screen name="PalestraRegister" component={PalestraRegister} />
    <Stack.Screen name="PalestraPartner" component={PartnerRegister} />
  </Stack.Navigator>
);

export default AuthNavigator;
