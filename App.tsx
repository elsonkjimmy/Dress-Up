import React, { useState} from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import WelcomeScreen from './screens/SplashScreen'; // Ton écran personnalisé
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  const [isStarted, setIsStarted] = useState(false);



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {isStarted ? <AppNavigator /> : <WelcomeScreen onStart={() => setIsStarted(true)} />}
    </GestureHandlerRootView>
  );
};

export default App;
