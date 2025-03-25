import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SplashScreen from './screens/SplashScreen';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {isStarted ? <AppNavigator /> : <SplashScreen onStart={() => setIsStarted(true)} />}
    </GestureHandlerRootView>
  );
};

export default App;
