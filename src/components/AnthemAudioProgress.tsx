import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {theme} from '../utils/theme';
import {Text} from 'react-native-paper';
import {padStart} from 'lodash';
import {State, usePlaybackState, useProgress} from 'react-native-track-player';

const AnthemAudioProgress: React.FC = () => {
  const playerState = usePlaybackState().state;
  const isPlaying = playerState === State.Playing;
  const progress = useProgress();
  const width = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(width, {
      toValue: isPlaying
        ? Math.round((progress.position / progress.duration) * 100)
        : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  });

  const renderTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${padStart(minutes.toString(), 2, '0')}:${padStart(
      seconds.toString(),
      2,
      '0',
    )}`;
  };

  if (isPlaying) {
    return (
      <View style={styles.container}>
        <View style={styles.player}>
          <Text variant="bodySmall">{renderTime(progress.position)}</Text>
          <Text variant="bodySmall">{renderTime(progress.duration)}</Text>
        </View>
        <Animated.View
          style={[
            {
              width: width.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
            styles.progressBar,
          ]}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.colors.backdrop,
  },
  player: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: theme.colors.primary,
  },
});

export default AnthemAudioProgress;
