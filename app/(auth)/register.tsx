import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const [name, setName] = useState<string>('');
  const [familyName, setFamilyName] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [genero, setGenero] = useState<string>('');
  const [vinculo, setVinculo] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const router = useRouter();

  const handleRegister = async () => {
    if (name && familyName && cpf && genero && vinculo && username && password) {
      try {
        const response = await fetch('https://auth.secompufpe.com/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            family_name: familyName,
            cpf,
            genero,
            vinculo,
            username,
            password,
          }),
        });

        if (response.ok) {
          Alert.alert('Registro bem-sucedido!', 'Você pode fazer login agora.');
          router.push('/(auth)/login');
        } else {
          const errorData = await response.json();
          Alert.alert('Erro no registro', errorData.message || 'Verifique os dados e tente novamente.');
        }
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível conectar ao servidor. Tente novamente.');
      }
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        value={familyName}
        onChangeText={setFamilyName}
      />
      <TextInput
        style={styles.input}
        placeholder="CPF"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Gênero"
        value={genero}
        onChangeText={setGenero}
      />
      <TextInput
        style={styles.input}
        placeholder="Vínculo"
        value={vinculo}
        onChangeText={setVinculo}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Registrar" onPress={handleRegister} />
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
