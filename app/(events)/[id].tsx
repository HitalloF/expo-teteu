import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function EventDetailsScreen() {
  const { id } = useLocalSearchParams();

  if (!id) {
    return <Text>Evento não encontrado</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalhes do Evento</Text>
      <Text style={styles.eventInfo}>ID do Evento: {id}</Text>
      {/* Adicione mais detalhes do evento aqui */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  eventInfo: {
    fontSize: 18,
  },
});
