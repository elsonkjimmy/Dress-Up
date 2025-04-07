import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function SplashScreen({ onStart }: { onStart: () => void }) {
  return (
    <View style={styles.container}>
      {/* Animation du logo */}
      <Animatable.Image
        animation="bounceIn"
        duration={1500}
        source={require('../assets/images/1.jpeg')}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Animation du message de bienvenue */}
      <Animatable.Text animation="fadeInDown" delay={500} style={styles.welcomeMessage}>
        <Text>Bienvenue sur DressUp !</Text>
      </Animatable.Text>

      {/* Animation du slogan */}
      <Animatable.Text animation="fadeInUp" delay={800} style={styles.slogan}>
        <Text>Choisissez votre style, créez vos looks</Text>
      </Animatable.Text>

      {/* Bouton stylisé avec effet de zoom */}
      <Animatable.View animation="pulse" iterationCount="infinite" delay={1500}>
        <TouchableOpacity onPress={onStart} style={styles.button}>
          <Text style={styles.buttonText}>Commencer</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6F61', // Couleur plus moderne
    padding: 20,
  },
  welcomeMessage: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#Ffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 260,
    height: 260,
    marginBottom: 20,
    borderRadius: 130, 
  },
  slogan: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 30,
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6F61',
  },
});
