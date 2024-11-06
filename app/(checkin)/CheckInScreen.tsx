import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useRouter } from 'expo-router';

// Definindo o tipo Evento
type Evento = {
  id: string;
  title: string;
  description: string;
  speaker: string;
  image: string;
  // adicione outros campos conforme necessário
};

export default function EventDetailsScreen({ params }: { params: { id: string } }) {
  const [evento, setEvento] = useState<Evento | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const token = "seu_token_aqui"; // Substitua pelo token que você obteve após o login

  useEffect(() => {
    const fetchEvento = async () => {
      try {
        const response = await fetch(`https://api.secompufpe.com/palestra/${params.id}`);
        if (!response.ok) {
          throw new Error("Erro ao carregar os detalhes da palestra");
        }
        const data = await response.json();
        setEvento(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvento();
  }, [params.id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Carregando detalhes da palestra...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {evento && (
        <>
          <Text style={styles.title}>{evento.title}</Text>
          <Text style={styles.description}>{evento.description}</Text>
          <Text style={styles.speaker}>Palestrante: {evento.speaker}</Text>

          <View style={styles.qrCodeContainer}>
            <Text style={styles.qrCodeLabel}>Inscreva-se para o evento:</Text>
            <QRCode
              value={token} // O valor que você deseja codificar no QR Code
              size={200} // Tamanho do QR Code
              backgroundColor="white"
              color="black"
            />
          </View>
        </>
      )}
      <Button title="Voltar" onPress={() => router.back()} />
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
  },
  description: {
    fontSize: 16,
    marginVertical: 10,
  },
  speaker: {
    fontSize: 16,
    color: '#666',
  },
  qrCodeContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  qrCodeLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
