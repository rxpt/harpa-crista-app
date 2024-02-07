import React from 'react';
import {AppRegistry} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player';
import {PlaybackService} from './src/services';
import {name as appName} from './app.json';
import {styles} from './src/utils/theme';
import App from './src/App';

export default function Main() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <App />
    </GestureHandlerRootView>
  );
}

AppRegistry.registerComponent(appName, () => Main);
TrackPlayer.registerPlaybackService(() => PlaybackService);
