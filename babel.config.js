module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // autres plugins ici...
    'react-native-reanimated/plugin', // Ce plugin DOIT être le dernier
  ],
};
