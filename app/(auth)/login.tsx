import { router } from 'expo-router';
import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => router.push('/home')}>
        <Text style={styles.buttonText}>Ir para Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000', // Fundo preto
  },
  button: {
    backgroundColor: '#EBFF08', // Cor do botão
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#F102AE', // Detalhe do botão
    shadowColor: '#EBFF08', // Sombra no botão
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#000000', // Cor do texto do botão
    fontSize: 16,
    fontWeight: 'bold',
  },
});
