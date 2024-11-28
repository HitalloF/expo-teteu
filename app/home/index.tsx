import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tab } from '@rneui/themed';
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
  sala: {
    id: number;
    title: string;
    capacity: number;
  };
};

export default function HomeScreen() {
  const router = useRouter();
  const [index, setIndex] = React.useState(0);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEventos = async () => {
      setLoading(true);

      try {
        const token = await AsyncStorage.getItem('token'); // Recupera o token do AsyncStorage
        if (!token) throw new Error('Token não encontrado');

        const response = await fetch('https://api.secompufpe.com/palestras', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao carregar eventos');
        }

        const data = await response.json();
        setEventos(data); // Atualiza o estado com os eventos recebidos
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventos();
  }, []);

  const handleEventoPress = (id: string) => {
    router.push(`/palestra/${id}/register`);
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
      <Text style={styles.title}>Palestras</Text>
      <Tab
  value={index}
  onChange={(e) => setIndex(e)}
  indicatorStyle={{
    backgroundColor: 'white',
    height: 3,
  }}
  variant="primary"
>
  <Tab.Item
    title="Seg"
    titleStyle={{ fontSize: 12 }}
    icon={{ name: 'calendar-outline', type: 'ionicon', color: 'white' }}
  />
  <Tab.Item
    title="Ter"
    titleStyle={{ fontSize: 12 }}
    icon={{ name: 'calendar-outline', type: 'ionicon', color: 'white' }}
  />
  <Tab.Item
    title="Qua"
    titleStyle={{ fontSize: 12 }}
    icon={{ name: 'calendar-outline', type: 'ionicon', color: 'white' }}
  />
  <Tab.Item
    title="Qui"
    titleStyle={{ fontSize: 12 }}
    icon={{ name: 'calendar-outline', type: 'ionicon', color: 'white' }}
  />
  <Tab.Item
    title="Sex"
    titleStyle={{ fontSize: 12 }}
    icon={{ name: 'calendar-outline', type: 'ionicon', color: 'white' }}
  />
</Tab>


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
            <Text style={styles.eventoSala}>Sala: {item.sala.title}</Text>
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
  eventoSala: {
    fontSize: 14,
    color: '#333',
    fontStyle: 'italic',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
