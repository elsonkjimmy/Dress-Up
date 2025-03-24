import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-gesture-handler';
//import LottieView from 'lottie-react-native';

const AvatarScreen = () => {
  return (
    <View style={styles.container}>
     <Text style={styles.text}>Ecran pour les tests de l'Avatar</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default AvatarScreen;
