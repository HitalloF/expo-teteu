// app/(events)/CreateEventScreen.tsx

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

  const handleCreateEvent = () => {
    if (!title || !duration || !description || !speaker || !timestamp) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const newEvent = {
      id: Date.now().toString(), // Gera um ID único para o evento
      title,
      duration: parseInt(duration),
      timestamp: parseInt(timestamp),
      description,
      speaker,
      vinculo: "Novo Vinculo",
      active: true,
      image: "https://example.com/default-image.jpg"
    };

    // Enviar ou salvar o novo evento - Aqui estamos apenas logando como exemplo
    console.log('Novo evento:', newEvent);
    Alert.alert('Sucesso', 'Palestra criada com sucesso!');
    
    // Redireciona para a tela de eventos
    router.push('/(home)');
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
