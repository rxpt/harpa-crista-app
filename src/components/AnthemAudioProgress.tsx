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
import {useIsPlaying, useProgress} from 'react-native-track-player';
import {theme} from '../utils/theme';

const AnthemAudioProgress = () => {
  const isPlaying = useIsPlaying().playing;
  const progress = useProgress();

  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(
      isPlaying ? Math.round((progress.position / progress.duration) * 100) : 0,
      {duration: 1000, easing: Easing.linear},
    );
  }, [isPlaying, progress, width]);

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
        <View style={styles.player}>
          <Text variant="bodySmall">{renderTime(progress.position)}</Text>
          <Text variant="bodySmall">{renderTime(progress.duration)}</Text>
        </View>
        <Animated.View style={[styles.progressBar, progressBarStyle]} />
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
    backgroundColor: theme.colors.backdrop,
  },
  player: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  progressBar: {
    height: 4,
    backgroundColor: theme.colors.inversePrimary,
  },
});

export default AnthemAudioProgress;
