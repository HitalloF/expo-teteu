import React, { useState, useEffect } from 'react';
import { 
  View, 
  TextInput, 
  Button, 
  StyleSheet, 
  Text, 
  ActivityIndicator, 
  Modal 
} from 'react-native';
import { CameraView } from 'expo-camera'; // Biblioteca QR
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PartnerCheckIn() {
  const [qrData, setQrData] = useState<string | null>(null);
  const [obs, setObs] = useState<string>('');
  const [partnerId, setPartnerId] = useState<number | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isCameraActive, setIsCameraActive] = useState(true); // Estado para controlar a câmera

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
          setPartnerId(partnerData[0].partner_id); // Armazena o partner_id
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
    setQrData(data);
  };

  const handleSend = async () => {
    if (!qrData || !obs) {
      alert('Por favor, preencha todos os campos antes de enviar.');
      return;
    }

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
        setModalMessage('Check-in realizado com sucesso!');
        // Limpar os campos após o sucesso
        setQrData(null);
        setObs('');
      } else {
        setModalMessage('Erro ao realizar check-in. Tente novamente.');
      }
    } catch (error) {
      setModalMessage('Erro ao enviar os dados. Verifique sua conexão.');
    } finally {
      setIsSending(false);
      setModalVisible(true); // Mostra o modal após o envio
    }
  };

  return (
    <View style={styles.container}>
      {isCameraActive ? (
        <CameraView
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={handleBarCodeScanned}
          style={styles.cameraView}
        />
      ) : (
        <View style={styles.cameraOff}>
          <Text style={styles.cameraOffText}>Câmera Desativada</Text>
        </View>
      )}

      <Button
        title={isCameraActive ? 'Desativar Câmera' : 'Ativar Câmera'}
        onPress={() => setIsCameraActive(!isCameraActive)}
        color="#f00" // Botão vermelho para destaque
      />

      <TextInput
        style={styles.input}
        value={qrData || ''}
        editable={false}
        placeholder="Email do Usuário"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        value={obs}
        onChangeText={setObs}
        placeholder="Observação"
        placeholderTextColor="#888"
      />
      <Button
        title={isSending ? 'Enviando...' : 'Enviar'}
        onPress={handleSend}
        disabled={isSending || !qrData || !obs}
      />
      {isSending && <ActivityIndicator size="large" color="#ffffff" />}
      
      {/* Modal de Confirmação */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <Button title="OK" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000', // Fundo preto
  },
  cameraView: {
    width: '100%',
    height: '40%',
    backgroundColor: 'gray',
  },
  cameraOff: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },
  cameraOffText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginTop: 10,
    width: '100%',
    paddingLeft: 8,
    color: '#fff', // Texto branco no fundo preto
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});
