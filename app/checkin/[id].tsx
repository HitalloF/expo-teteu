import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
// import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRCodeScannerScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  // useEffect(() => {
  //   // Solicitar permissão para câmera
  //   (async () => {
  //     const { status } = await BarCodeScanner.requestPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   })();
  // }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    Alert.alert(`QR Code escaneado!`, `Tipo: ${type}\nConteúdo: ${data}`);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão para a câmera...</Text>;
  }

  if (hasPermission === false) {
    return <Text>Sem permissão para acessar a câmera.</Text>;
  }

  return (
    <View style={styles.container}>
   <text>helo</text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
