import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';

interface User {
  email: string;
  name: string;
  family_name: string;
  password: string;
  vinculo: string;
  genero: string;
  cpf: string;
}

export default function UserListScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = window.localStorage.getItem('token')

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`https://api.secompufpe.com/usuarios`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Adiciona o token Bearer aqui
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data: User[] = await response.json();
          setUsers(data);
        } else {
          console.error('Erro ao buscar usuários');
        }
      } catch (error) {
        console.error('Erro na requisição:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Usuários</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.cpf}
        renderItem={({ item }) => (
          <View style={styles.userCard}>
            <Text style={styles.userInfo}>Nome: {item.name} {item.family_name}</Text>
            <Text style={styles.userInfo}>Email: {item.email}</Text>
            <Text style={styles.userInfo}>Vínculo: {item.vinculo}</Text>
            <Text style={styles.userInfo}>Gênero: {item.genero}</Text>
            <Text style={styles.userInfo}>CPF: {item.cpf}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  userCard: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  userInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
});
