import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {padStart} from 'lodash';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useAppContext} from '../providers/AppProvider';
import {theme} from '../utils/theme';
import TrackPlayer from 'react-native-track-player';

const AnthemAudioProgress = () => {
  const {
    state: {isPlaying, trackProgress: progress, playerReady, currentAnthem},
  } = useAppContext();

  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(
      isPlaying ? Math.round((progress.position / progress.duration) * 100) : 0,
      {duration: 1000, easing: Easing.linear},
    );
  }, [isPlaying, progress, width]);

  useEffect(() => {
    if (!playerReady) {
      return;
    }

    TrackPlayer.reset();
  }, [playerReady, currentAnthem]);

  const renderTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${padStart(minutes.toString(), 2, '0')}:${padStart(
      seconds.toString(),
      2,
      '0',
    )}`;
  };

  const progressBarStyle = useAnimatedStyle(() => {
    return {
      width: `${width.value}%`,
    };
  });

  if (isPlaying) {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.container, styles.progressBar, progressBarStyle]}
        />
        <View style={styles.player}>
          <Text variant="bodySmall">{renderTime(progress.position)}</Text>
          <Text variant="bodySmall">{renderTime(progress.duration)}</Text>
        </View>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  player: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 4,
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.inversePrimary,
  },
});

export default AnthemAudioProgress;
