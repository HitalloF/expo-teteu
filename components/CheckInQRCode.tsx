// components/CheckInQRCode.tsx

import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

interface CheckInQRCodeProps {
  eventId: string; // ID do evento para gerar QR Code
}

const CheckInQRCode: React.FC<CheckInQRCodeProps> = ({ eventId }) => {
  const handleCheckIn = () => {
    // Aqui você pode adicionar a lógica para registrar o check-in
    Alert.alert('Check-in realizado!', `Você fez check-in no evento ${eventId}.`);
  };

  return (
    <View style={{ alignItems: 'center', marginVertical: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>Escaneie o QR Code para fazer check-in</Text>
      <QRCode
        value={eventId} // O valor a ser codificado no QR Code
        size={200}
        color="black"
        backgroundColor="white"
      />
      <Button title="Fazer Check-in" onPress={handleCheckIn} />
    </View>
  );
};

export default CheckInQRCode;
