import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';
import { CameraView } from 'expo-camera'; // Para leitura do QR Code
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PartnerCheckIn() {
  const [qrData, setQrData] = useState<string | null>(null);
  const [obs, setObs] = useState<string>('');
  const [partnerId, setPartnerId] = useState<number | null>(null);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const fetchPartnerInfo = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) throw new Error('Token não encontrado');

        const response = await fetch('https://api.secompufpe.com/partner/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const partnerData = await response.json();
          setPartnerId(partnerData.partner_id); // Armazena o partner_id
        } else {
          console.error('Erro ao obter informações do parceiro');
        }
      } catch (error) {
        console.error('Erro ao buscar informações do parceiro:', error);
      }
    };

    fetchPartnerInfo();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    console.log('QR Code escaneado:', data); // Verifique se está capturando os dados
    setQrData(data);
  };

  const handleSend = () => {
    console.log('Enviando dados...', qrData, obs); // Verifique os dados que estão sendo enviados
    if (!qrData || !obs || !partnerId) return;

    // Exibir o modal de confirmação
    Alert.alert(
      'Confirmar Envio',
      'Tem certeza que deseja enviar os dados?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Confirmar',
          onPress: async () => {
            setIsSending(true);
            try {
              const token = await AsyncStorage.getItem('token');
              const response = await fetch(`https://api.secompufpe.com/partner/${partnerId}/checkin`, {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  usuario_email: qrData,
                  obs,
                }),
              });

              if (response.ok) {
                alert('Check-in realizado com sucesso!');
              } else {
                alert('Erro ao realizar check-in.');
              }
            } catch (error) {
              alert('Erro ao enviar os dados.');
            } finally {
              setIsSending(false);
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <CameraView
        barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        onBarcodeScanned={handleBarCodeScanned}
        style={styles.cameraView}
      />
      <View style={styles.overlay}>
        <TextInput
          style={styles.input}
          value={qrData || ''}
          editable={false}
          placeholder="Email do Usuário"
        />
        <TextInput
          style={styles.input}
          value={obs}
          onChangeText={setObs}
          placeholder="Observação"
        />
        <Button
          title={isSending ? 'Enviando...' : 'Enviar'}
          onPress={handleSend}
          disabled={isSending || !qrData || !obs}
        />
        {isSending && <ActivityIndicator size="large" color="#0000ff" />}
      </View>
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
    width: '100%',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
    width: '100%',
    paddingLeft: 8,
    color: '#fff',
    backgroundColor: '#333',
    borderRadius: 5,
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
});
