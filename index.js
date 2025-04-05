/**
 * @format


import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);


*/



// Dans votre fichier d'initialisation (ex: index.js)
import 'react-native-reanimated';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';

// Patch critique avant le rendu
if (!global.__RNCWebView) {
  require('react-native-webview').default;
}

AppRegistry.registerComponent(appName, () => App);