// EventDetailsScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = {
  route: RouteProp<{ params: { eventId: string } }, 'params'>;
  navigation: NativeStackScreenProps<any>;
};

const EventDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { eventId } = route.params;

  return (
    <View>
      <Text>Event ID: {eventId}</Text>
      {/* Renderize mais informações sobre o evento aqui */}
    </View>
  );
};

export default EventDetailsScreen;
