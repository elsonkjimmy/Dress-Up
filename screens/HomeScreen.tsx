import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const HomeScreen = ({ navigation }: any) => {
  const scaleValue = new Animated.Value(1);

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <ScrollView style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Fashion Avatar</Text>
        <Text style={styles.subtitle}>Créez votre style unique</Text>

        {/* Options principales avec animations */}
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary]}
            onPress={() => {
              animateButton();
              navigation.navigate('AvatarCreator');
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Créer mon Avatar</Text>
            <Text style={styles.buttonSubtext}>Personnalisez votre apparence ici </Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity 
            style={[styles.button, styles.buttonSecondary]}
            onPress={() => {
              animateButton();
              navigation.navigate('Wardrobe');
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Ma Garde-Robe</Text>
            <Text style={styles.buttonSubtext}>Vos vêtements favoris présents !!</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity 
            style={[styles.button, styles.buttonAccent]}
            onPress={() => {
              animateButton();
              navigation.navigate('StyleExplorer');
            }}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>Explorer les Styles</Text>
            <Text style={styles.buttonSubtext}>Découvrez les dernières tendances</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Section supplémentaire */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>👗</Text>
            <Text style={styles.featureText}>10 000+ vêtements</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>🌟</Text>
            <Text style={styles.featureText}>Tendances 2024</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.featureIcon}>💡</Text>
            <Text style={styles.featureText}>Suggestions intelligentes</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor:'#fff',
  },
  overlay: {
  //  flex: 1,
   //backgroundColor: 'rgba(202, 202, 202, 0.4)',
    //justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '000',
    marginBottom: 5,
    //textShadowColor: 'rgba(0,0,0,0.5)',
    //textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#333',
    marginBottom: 40,
    //textShadowColor: 'rgba(0,0,0,0.5)',
    //textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 30,
    paddingLeft:30,
    paddingRight:30,
    borderRadius: 15,
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonPrimary: {
    backgroundColor: '#FF6B6B',
  },
  buttonSecondary: {
    backgroundColor: '#4ECDC4',
  },
  buttonAccent: {
    backgroundColor: '#FFA07A',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonSubtext: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
    marginTop: 5,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 40,
  },
  featureItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(221, 57, 221, 0.9)',
    padding: 10,
    borderRadius: 10,
    width: '30%',
  },
  featureIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  featureText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default HomeScreen;