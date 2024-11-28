import { router } from 'expo-router';
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
;

export default function LoginScreen() {
  

  return (
    <View style={styles.container}>
      <Button 
        title="Ir para Home" 
        onPress={() => router.push('/home')} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});
