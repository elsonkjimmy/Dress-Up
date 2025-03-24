import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import WardrobeScreen from '../screens/WardrobeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AvatarScreen from '../screens/AvatarScreen';
//import { View, Text } from 'react-native';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="Garde-Robe" component={WardrobeScreen} />
        <Tab.Screen name="Avatar" component={AvatarScreen} />
        <Tab.Screen name="Profil" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
