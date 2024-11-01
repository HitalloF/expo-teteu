// app/(home)/index.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Link, useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();
  const [eventos, setEventos] = useState<{ id: string; title: string; horario?: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Chamada para uma API pública para simular dados de eventos
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        // Mapeia os dados da API para incluir uma hora fictícia para cada evento
        const eventosFormatados = data.slice(0, 10).map((evento: any) => ({
          id: evento.id.toString(),
          title: evento.title,
          horario: `${Math.floor(Math.random() * 12 + 1)}:00 ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
        }));
        setEventos(eventosFormatados);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro ao buscar dados da API:', error);
        setLoading(false);
      });
  }, []);

  const handleEventoPress = (id: string) => {
    router.push(`/events/${id}`); // Roteia corretamente para a página de detalhes do evento
  };
  
  
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
       
        <Text>Carregando eventos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos</Text>
     



      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.eventoItem} onPress={() => handleEventoPress(item.id)}>
            <Text style={styles.eventoTitle}>{item.title}</Text>
            <Text style={styles.eventoHorario}>{item.horario}</Text>
           
          </TouchableOpacity>
          
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  eventoItem: {
    padding: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  eventoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventoHorario: {
    fontSize: 16,
    color: '#666',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
