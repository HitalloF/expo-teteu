import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera'; // Importando a Camera do expo-camera
import { BarCodeScanner } from 'expo-barcode-scanner'; // Importando o scanner de código de barras

const CameraScannerTest = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');

  useEffect(() => {
    (async () => {
      // Solicita permissão para usar a câmera
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Função chamada ao escanear o código
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setScannedData(`Tipo: ${type}\nDado: ${data}`);
    alert(`Código escaneado!\nTipo: ${type}\nDado: ${data}`);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.centered}>
        <Text>Solicitando permissões...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.centered}>
        <Text>Permissão negada. Habilite a câmera nas configurações do dispositivo.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Escaneie um Código de Barras</Text>
      {/* Usando o BarCodeScanner para capturar e processar os códigos de barras */}
      <Camera style={styles.camera}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} // Invoca a função ao escanear
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button title="Escanear Novamente" onPress={() => setScanned(false)} />
        )}
      </Camera>
      <Text style={styles.data}>{scannedData}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  data: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CameraScannerTest;
