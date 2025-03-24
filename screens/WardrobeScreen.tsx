import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const WardrobeScreen = () => {
  const wardrobeItems = [
    { id: 1, name: 'Robe Noire', image: require('../assets/black-dress.png') },    
    { id: 2, name: 'Jean Slim', image: require('../assets/skinny-jeans.jpeg') },
    { id: 3, name: 'T-shirt Bleu', image: require('../assets/blue-shirt.jpeg') },
    // Ajoute d'autres articles ici...
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ma Garde-Robe</Text>
      
      {wardrobeItems.map((item) => (
        <View key={item.id} style={styles.itemContainer}>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.itemName}>{item.name}</Text>
        </View>
      ))}
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
  itemContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 10,
  },
  itemName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});

export default WardrobeScreen;
