import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const CameraTest = () => {
  return (
    <View style={styles.container}>
      <BarCodeScanner style={StyleSheet.absoluteFillObject} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CameraTest;
