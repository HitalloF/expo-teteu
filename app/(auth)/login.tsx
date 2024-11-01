// app/(auth)/login.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleLogin = () => {
    // Simulação de autenticação e definição do tipo de usuário
    let userType = ''; // Aqui, você determina o tipo de usuário (por exemplo, 'user', 'partner', 'admin')
    
    if (email === 'a' && password === '123') {
      userType = 'user';
    } else if (email === 'b' && password === '123') {
      userType = 'partner';
    } else if (email === 'c' && password === '123') {
      userType = 'admin';
    } else {
      Alert.alert('Erro de autenticação', 'Credenciais inválidas.');
      return;
    }

    // Redireciona com base no tipo de usuário
    switch (userType) {
      case 'user':
        router.push('/HomeScreen');
        break;
      case 'partner':
        router.push('/HomeScreen');
        break;
      case 'admin':
        router.push('/HomeScreen');
        break;
      default:
        Alert.alert('Erro', 'Tipo de usuário desconhecido.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
