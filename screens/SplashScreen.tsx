import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function SplashScreen({ onStart }: { onStart: () => void }) {
  return (
    <View style={styles.container}>
      {/* Message de bienvenue */}
      <Text style={styles.welcomeMessage}>Bienvenue sur DressUp !</Text>

      {/* Logo ou image représentative */}
      <Image
        source={require('../assets/images/1.jpeg')} // Assure-toi que le chemin est correct
        style={styles.logo}
      />

      {/* Slogan */}
      <Text style={styles.slogan}>Choisissez votre style, créez vos looks</Text>

      {/* Bouton pour démarrer */}
      <TouchableOpacity onPress={onStart} style={styles.button}>
        <Text style={styles.buttonText}>Commencer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5', // Fond doux
    padding: 20,
  },
  welcomeMessage: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FF6F61',
    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 250,
    height: 220,
    marginBottom: 30,
  },
  slogan: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    backgroundColor: '#FF6F61',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
