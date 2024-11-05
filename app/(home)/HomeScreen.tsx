import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';

// Definindo o tipo Evento com todas as propriedades
type Evento = {
  id: string;
  duration: number;
  timestamp: number;
  title: string;
  description: string;
  vinculo: string;
  active: boolean;
  speaker: string;
  image: string;
};

export default function HomeScreen() {
  const router = useRouter();
  
  // Especificando o tipo de eventos como Evento[]
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setEventos([
        {
          id: "1",
          duration: 60,
          timestamp: 1699200000,
          title: "Inovações em Tecnologia",
          description: "Explorando as últimas inovações no mundo da tecnologia.",
          vinculo: "Empresa A",
          active: true,
          speaker: "Alice Silva",
          image: "https://example.com/image1.jpg",
        },
        {
          id: "2",
          duration: 45,
          timestamp: 1699203600,
          title: "Desenvolvimento Web Moderno",
          description: "Técnicas e ferramentas para desenvolvimento web atual.",
          vinculo: "Empresa B",
          active: true,
          speaker: "Carlos Souza",
          image: "https://example.com/image2.jpg",
        },
        // Adicione os outros objetos de evento aqui...
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleEventoPress = (id: string) => {
    router.push(`/events/${id}`);
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

      <Link href="/events/CreateEventScreen" style={styles.createButton}>
        <Text style={styles.createButtonText}>Criar Nova Palestra</Text>
      </Link>
      <Link href="/users/index.tsx" style={styles.createButton}>
        <Text style={styles.createButtonText}>Users</Text>
      </Link>

      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.eventoItem} onPress={() => handleEventoPress(item.id)}>
            <Image source={{ uri: item.image }} style={styles.eventoImage} />
            <Text style={styles.eventoTitle}>{item.title}</Text>
            <Text style={styles.eventoSpeaker}>{item.speaker}</Text>
            <Text style={styles.eventoDescription}>{item.description}</Text>
            <Text style={styles.eventoHorario}>Duração: {item.duration} minutos</Text>
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
  createButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eventoItem: {
    padding: 15,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
  },
  eventoImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  eventoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventoSpeaker: {
    fontSize: 16,
    color: '#666',
  },
  eventoDescription: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  eventoHorario: {
    fontSize: 14,
    color: '#333',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
