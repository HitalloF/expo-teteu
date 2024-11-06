import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function CreateEventScreen() {
  const router = useRouter();
  const [title, setTitle] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [speaker, setSpeaker] = useState<string>('');
  const [timestamp, setTimestamp] = useState<string>('');

  const handleCreateEvent = async () => {
    if (!title || !duration || !description || !speaker || !timestamp) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    // Recupera o token de autenticação do localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    const newEvent = {
      title,
      duration: parseInt(duration),
      timestamp: parseInt(timestamp),
      description,
      speaker,
      vinculo: "Novo Vinculo",
      active: true,
      image: "https://example.com/default-image.jpg"
    };

    try {
      const response = await fetch('https://api.secompufpe.com/palestra', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newEvent)
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Palestra criada com sucesso!');
        router.push('/(home)');
      } else {
        Alert.alert('Erro', 'Falha ao criar a palestra.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar criar a palestra.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Nova Palestra</Text>

      <TextInput
        style={styles.input}
        placeholder="Título da Palestra"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Duração (em minutos)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Nome do Palestrante"
        value={speaker}
        onChangeText={setSpeaker}
      />
      <TextInput
        style={styles.input}
        placeholder="Horário (timestamp)"
        value={timestamp}
        onChangeText={setTimestamp}
        keyboardType="numeric"
      />

      <Button title="Criar Palestra" onPress={handleCreateEvent} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
});
