// screens/AuthScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../context/AuthContext';

const AuthScreen = ({ navigation }: any) => {
  const { login } = useAuth();

  const handleLogin = () => {
    const loginData = { username: 'exampleUser', password: 'examplePassword' }; // Remplacez par les données réelles
    login(loginData);
    navigation.replace('Profile'); // Redirige vers Profil après login
  };


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Veuillez vous connecter ou vous inscrire</Text>
      <Button title="Connexion rapide" onPress={handleLogin} />
    </View>
  );
};

export default AuthScreen;
