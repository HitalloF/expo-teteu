import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useLocalSearchParams } from 'expo-router';

export default function checkin() {
  const { id } = useLocalSearchParams(); // Pega o ID da palestra da URL
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [permission, requestPermission] = useCameraPermissions();


  console.log(id)
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

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setQrCodeData(data);
    // Agora, você pode enviar o ID da palestra e o e-mail do QR code para registrar o usuário
    Alert.alert('QR Code Detectado', `ID da Palestra: ${id}\nEmail: ${data}`);

    // Exemplo de chamada para registrar o usuário na palestra
    const registerUserForEvent = async () => {
      try {
        const response = await fetch(`https://api.secompufpe.com/palestras/${id}/checkin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            usuario_email: data, // e-mail do QR Code
          }),
        });

        if (response.ok) {
          Alert.alert('Sucesso', 'Você foi registrado na palestra!');
        } else {
          Alert.alert('Erro', 'Falha ao registrar usuário na palestra.');
        }
      } catch (error) {
        Alert.alert('Erro', 'Erro ao registrar na palestra.');
      }
    };

    registerUserForEvent();
  };


  return (
    <View style={styles.container}>
      {qrCodeData ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>Dados do QR Code:</Text>
          <Text style={styles.resultData}>{qrCodeData}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setQrCodeData(null)}
          >
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
          <View style={styles.buttonContainer}>

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
  message: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
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
  resultData: {
    fontSize: 18,
    color: '#1e90ff',
    marginVertical: 10,
  },
});
