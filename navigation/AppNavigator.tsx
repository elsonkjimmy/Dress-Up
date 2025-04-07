// AppNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import AvatarScreen from '../screens/AvatarScreen';
import WardrobeScreen from '../screens/WardrobeScreen';
import { AuthProvider } from '../context/AuthContext';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import { useAuth } from '../context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';


type RootTabParamList = {
  Home: undefined;
  Avatar: undefined;
  Wardrobe: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();



const ProfileNavigator = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </>
      ) : (
        <Stack.Screen name="Profile" component={ProfileScreen} />
      )}
    </Stack.Navigator>
  );
};




const getTabBarIcon = (
  route: RouteProp<RootTabParamList, keyof RootTabParamList>,
  focused: boolean,
  color: string,
  size: number
) => {
  let iconName: string;
  switch (route.name) {
    case 'Home': iconName = focused ? 'home' : 'home-outline'; break;
    case 'Avatar': iconName = focused ? 'person-circle' : 'person-circle-outline'; break;
    case 'Wardrobe': iconName = focused ? 'shirt' : 'shirt-outline'; break;
    case 'Profile': iconName = focused ? 'person' : 'person-outline'; break;
    default: iconName = 'help-circle-outline';
  }
  return <Ionicons name={iconName} size={size} color={color} />;
};

const AppNavigator = () => {
  return (
    <AuthProvider>
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
            tabBarActiveTintColor: '#FF6F61',
            tabBarInactiveTintColor: '#AAA',
            tabBarShowLabel: true,
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Avatar" component={AvatarScreen} />
          <Tab.Screen name="Wardrobe" component={WardrobeScreen} />
          <Tab.Screen name="Profile" component={ProfileNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default AppNavigator;
