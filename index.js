import 'react-native-gesture-handler';
import React from 'react';
import {AppRegistry} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {PlaybackService} from './src/services';
import {name as appName} from './app.json';
import App from './src/App';

export default function Main() {
  return <App />;
}

AppRegistry.registerComponent(appName, () => Main);
TrackPlayer.registerPlaybackService(() => PlaybackService);
