import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from 'react-native';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [style, setStyle] = useState('');
  const [size, setSize] = useState('');

  const handleSave = () => {
    // Logique pour sauvegarder les données de l'utilisateur
    console.log('Utilisateur sauvegardé:', { name, style, size });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Profil Utilisateur</Text>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nom:</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre nom"
          value={name}
          onChangeText={setName}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Style préféré:</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre style préféré"
          value={style}
          onChangeText={setStyle}
        />
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Taille:</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez votre taille"
          value={size}
          onChangeText={setSize}
        />
      </View>
      
      <Button title="Sauvegarder" onPress={handleSave} />
    </ScrollView>
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
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    fontSize: 16,
  },
});

export default ProfileScreen;
