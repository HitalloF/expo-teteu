import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRCodeScanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isScanning, setIsScanning] = useState(true);

  // Solicita permissão para usar a câmera
  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };

    requestPermission();
  }, []);

  // Handle para quando o QR Code for escaneado
  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setIsScanning(false); // Pausa o scanner após a leitura
    Alert.alert('QR Code Lido', `Tipo: ${type}\nDados: ${data}`, [
      {
        text: 'Ler Novamente',
        onPress: () => setIsScanning(true), // Reinicia o scanner
      },
    ]);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Solicitando permissão para usar a câmera...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Permissão para acessar a câmera foi negada.</Text>
        <Button title="Tentar Novamente" onPress={() => setHasPermission(null)} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isScanning ? (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      ) : (
        <View style={styles.buttonContainer}>
          <Text>Leitura de QR Code pausada.</Text>
          <Button title="Reiniciar Scanner" onPress={() => setIsScanning(true)} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
