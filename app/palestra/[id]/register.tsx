import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Checkin() {
  const { id } = useLocalSearchParams(); // Pega o ID da palestra da URL
  
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [message, setMessage] = useState<string | null>(null);
  const [messageColor, setMessageColor] = useState<string>('#1e90ff'); // Cor padrão (azul)
  const [showMessage, setShowMessage] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false); // Evita requisições duplicadas
  const { width, height } = Dimensions.get('window'); // Largura e altura da tela
  const scannerSize = width * 0.5; // 60% da largura da tela

  useEffect(() => {
    if (message) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setMessage(null); // Limpa a mensagem para o próximo uso
        setQrCodeData(null); // Limpa o QR Code e volta para o scanner
      }, 3000); // Exibe a mensagem por 3 segundos
    }
  }, [message]);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Precisamos da sua permissão para usar a câmera</Text>
        <TouchableOpacity onPress={requestPermission} style={styles.button}>
          <Text style={styles.text}>Conceder permissão</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (isSubmitting) return; // Evita chamadas simultâneas
    setQrCodeData(data);
    setIsSubmitting(true);
    const token = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(`https://api.secompufpe.com/palestras/${id}/checkin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          usuario_email: data, // e-mail do QR Code
        }),
      });

      if (response.ok) {
        const responseJson = await response.json();
        setMessage(responseJson.message || 'Check-in realizado com sucesso!');
        setMessageColor('#32CD32'); // Cor verde para sucesso
      } else {
        const responseJson = await response.json();
        setMessage(responseJson.error || responseJson.message || `Erro: ${response.status} - ${response.statusText}`);
        setMessageColor('#FF6347'); // Cor vermelha para erro
      }
    } catch (error) {
      setMessage('Erro ao registrar na palestra. Verifique sua conexão.');
      setMessageColor('#FF6347'); // Cor vermelha para erro
    } finally {
      setIsSubmitting(false); // Libera para novas requisições
    }
  };

  return (
    <View style={styles.container}>
      {qrCodeData ? (
        <View style={styles.resultContainer}>
          
          {showMessage && (
            <View style={[styles.messageContainer, { backgroundColor: messageColor }]}>
              <Text style={styles.resultText}>{message}</Text>
            </View>
          )}
          <TouchableOpacity style={styles.button} onPress={() => setQrCodeData(null)}>
            <Text style={styles.text}>Ler outro QR Code</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <CameraView
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}
          onBarcodeScanned={handleBarCodeScanned}
          style={styles.cameraView}
        >
          <View style={styles.overlay}>
            {/* Camada superior de sobreposição */}
            <View style={styles.topOverlay} />
            <View style={styles.middleOverlay}>
              <View style={styles.sideOverlay} />
              {/* Quadrado de escaneamento */}
              <View style={[styles.scanFrame, { width: scannerSize, height: scannerSize }]} />
              <View style={styles.sideOverlay} />
            </View>
            {/* Camada inferior de sobreposição */}
            <View style={styles.bottomOverlay} />
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  cameraView: {
    flex: 1,
  },
  overlay: {
    position: 'absolute', // Necessário para ficar sobre a câmera
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topOverlay: {
    flex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Escurece a parte superior
  },
  middleOverlay: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'relative', // Garante que o centro fique na frente
  },
  sideOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Escurece os lados
  },
  scanFrame: {

    backgroundColor: 'transparent', // Manter transparente o centro
    zIndex: 10, // Garante que o quadrado esteja sobre as outras camadas
  },
  bottomOverlay: {
    flex: 2,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Escurece a parte inferior
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  button: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 16,
    color: 'white',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  messageContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    opacity: 0.9,
    zIndex: 10,
  },
});
