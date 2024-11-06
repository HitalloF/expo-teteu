import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, Button, Alert, TextInput, Modal } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

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

export default function EventoDetalhesScreen() {
  const { id } = useLocalSearchParams();
  const [evento, setEvento] = useState<Evento | null>(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editForm, setEditForm] = useState<Evento | null>(null);

  const navigation = useNavigation(); // Hook de navegação dentro do componente

  useEffect(() => {
    const fetchEvento = async () => {
      if (!id) return;

      setLoading(true);
      const token = localStorage.getItem('token');

      try {
        const response = await fetch(`https://api.secompufpe.com/palestras/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Erro ${response.status}: ${errorData.message || 'Detalhes não encontrados'}`);
        }

        const data = await response.json();
        setEvento(data);
      } catch (error) {
        console.error('Erro ao carregar os detalhes da palestra:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvento();
  }, [id]);

  const handleDeleteEvento = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`https://api.secompufpe.com/palestras/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ${response.status}: ${errorData.message || 'Não foi possível deletar a palestra'}`);
      }

      Alert.alert('Sucesso', 'Palestra deletada com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }, // Navega para a página anterior
      ]);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao deletar a palestra:', error.message);
        Alert.alert('Erro', error.message);
      } else {
        console.error('Erro desconhecido ao deletar a palestra:', error);
        Alert.alert('Erro', 'Ocorreu um erro desconhecido ao deletar a palestra.');
      }
    }
  };

  const handleEditEvento = async () => {
    if (!editForm) return;

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`https://api.secompufpe.com/palestras/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ${response.status}: ${errorData.message || 'Não foi possível editar a palestra'}`);
      }

      Alert.alert('Sucesso', 'Palestra editada com sucesso!', [
        { text: 'OK', onPress: () => {
          setModalVisible(false); 
          setEvento(editForm); // Atualiza os detalhes da palestra com as novas informações
        }},
      ]);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erro ao editar a palestra:', error.message);
        Alert.alert('Erro', error.message);
      } else {
        console.error('Erro desconhecido ao editar a palestra:', error);
        Alert.alert('Erro', 'Ocorreu um erro desconhecido ao editar a palestra.');
      }
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Confirmar Deleção',
      'Você tem certeza que deseja deletar esta palestra?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        { text: 'Deletar', onPress: handleDeleteEvento },
      ],
      { cancelable: false }
    );
  };

  const handleInputChange = (field: string, value: string) => {
    setEditForm((prev) => ({ ...prev!, [field]: value }));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando detalhes...</Text>
      </View>
    );
  }

  if (!evento) {
    return (
      <View style={styles.container}>
        <Text>Evento não encontrado</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: evento.image }} style={styles.eventoImage} />
      <Text style={styles.eventoTitle}>{evento.title}</Text>
      <Text style={styles.eventoSpeaker}>Palestrante: {evento.speaker}</Text>
      <Text style={styles.eventoDescription}>{evento.description}</Text>
      <Text style={styles.eventoHorario}>Duração: {evento.duration} minutos</Text>
      <Text style={styles.eventoSala}>Sala: {evento.sala.title}</Text>

      <Button title="Mostrar QR Code" onPress={() => setModalVisible(true)} />
      <Button title="Deletar Palestra" onPress={confirmDelete} />
      <Button title="Editar Palestra" onPress={() => {
        setEditForm(evento);  // Preenche o formulário com os dados da palestra
        setModalVisible(true);
      }} />

      {/* Modal para editar o evento */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Fechar modal
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.qrCodeLabel}>Editar Palestra</Text>
            <TextInput
              value={editForm?.title}
              onChangeText={(text) => handleInputChange('title', text)}
              style={styles.input}
              placeholder="Título"
            />
            <TextInput
              value={editForm?.description}
              onChangeText={(text) => handleInputChange('description', text)}
              style={styles.input}
              placeholder="Descrição"
            />
            <TextInput
              value={editForm?.speaker}
              onChangeText={(text) => handleInputChange('speaker', text)}
              style={styles.input}
              placeholder="Palestrante"
            />
            <Button title="Salvar" onPress={handleEditEvento} />
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  eventoImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  eventoTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  eventoSpeaker: {
    fontSize: 18,
    color: '#666',
    marginBottom: 5,
  },
  eventoDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  eventoHorario: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  eventoSala: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
    marginBottom: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  qrCodeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
});
