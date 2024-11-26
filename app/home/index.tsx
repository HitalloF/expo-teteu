import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const HomeScreen = () => {
  const navigation = useNavigation();

  const goToScanner = () => {
    router.push('/checkin/CameraScannerTest'); // Redireciona para a página inicial// Use o nome exato registrado no Stack.Navigator
  };

  return (
    <View style={styles.container}>
      <Button title="Ir para o Scanner" onPress={goToScanner} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
