import React from 'react';
//import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import AvatarScreen from '../screens/AvatarScreen';
import WardrobeScreen from '../screens/WardrobeScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Définition des types des routes
type RootTabParamList = {
  Home: undefined;
  Avatar: undefined;
  Wardrobe: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator();
// 🎨 Fonction qui retourne l'icône du tab bar
const getTabBarIcon = (
  route: RouteProp<RootTabParamList, keyof RootTabParamList>,
  focused: boolean,
  color: string,
  size: number
) => {
  let iconName: string;

  switch (route.name) {
    case 'Home':
      iconName = focused ? 'home' : 'home-outline';
      break;
    case 'Avatar':
      iconName = focused ? 'person-circle' : 'person-circle-outline';
      break;
    case 'Wardrobe':
      iconName = focused ? 'shirt' : 'shirt-outline';
      break;
    case 'Profile':
      iconName = focused ? 'person' : 'person-outline';
      break;
    default:
      iconName = 'help-circle-outline';
  }
  console.log(`Rendering icon for ${route}: ${iconName}`); // Debugger la valeur de iconName
  return <Ionicons name={iconName} size={size} color={color} />;
};

const AppNavigator : any = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
       screenOptions={({ route }: { route: RouteProp<RootTabParamList, keyof RootTabParamList> }) => ({
        tabBarIcon: ({
          focused,
          color,
          size,
        }: {
          focused: boolean;
          color: string;
          size: number;
        }) => getTabBarIcon(route, focused, color, size),
        tabBarActiveTintColor: '#FF6F61', // Couleur active (rouge moderne)
        tabBarInactiveTintColor: '#AAA',  // Couleur inactive
        tabBarShowLabel: true, // Masquer les labels des icônes
        //tabBarStyle: styles.tabBarStyle,
        headerShown: false,
      })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Avatar" component={AvatarScreen} />
        <Tab.Screen name="Wardrobe" component={WardrobeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

/*/ 🎨 Style de la barre de navigation
const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    bottom: 15,
    left: 20,
    right: 20,
    height: 70,
    backgroundColor: '#ffffff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5, // Ombre sur Android
  },
});
*/
export default AppNavigator;
