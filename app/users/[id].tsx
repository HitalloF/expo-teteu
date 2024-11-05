import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

type User = {
  email: string;
  name: string;
  family_name: string;
  vinculo: string;
  genero: string;
  cpf: string;
};

// Mock de usuários (substitua isso pela importação do seu mock, se necessário)
const users: User[] = [
  {
    email: "alice.silva@example.com",
    name: "Alice Silva",
    family_name: "Silva",
    vinculo: "Empresa A",
    genero: "Feminino",
    cpf: "123.456.789-00",
  },
  {
    email: "carlos.souza@example.com",
    name: "Carlos Souza",
    family_name: "Souza",
    vinculo: "Empresa B",
    genero: "Masculino",
    cpf: "234.567.890-01",
  },
  // ... Adicione os outros usuários aqui
];

const UserListScreen = () => {
  const renderUserItem = ({ item }: { item: User }) => (
    <View style={styles.userItem}>
      <Text style={styles.userName}>{item.name} {item.family_name}</Text>
      <Text>Email: {item.email}</Text>
      <Text>Vínculo: {item.vinculo}</Text>
      <Text>Gênero: {item.genero}</Text>
      <Text>CPF: {item.cpf}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuários</Text>
      <FlatList
        data={users}
        renderItem={renderUserItem}
        keyExtractor={(item) => item.cpf} // Usando CPF como chave única
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  userItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default UserListScreen;
