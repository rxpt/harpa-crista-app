import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {padStart} from 'lodash';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {theme} from '../../utils/styles';
import {useIsPlaying, useProgress} from 'react-native-track-player';
import {setupPlayer} from '../../services';
import Text from '../Text';

const AnthemAudioProgress = ({number}: {number: number}) => {
  const isPlaying = useIsPlaying().playing;
  const progress = useProgress();
  const width = useSharedValue(0);

  useEffect(() => {
    width.value = withTiming(
      isPlaying ? Math.round((progress.position / progress.duration) * 100) : 0,
      {duration: 1000, easing: Easing.linear},
    );
  }, [isPlaying, progress, width]);

  useEffect(() => {
    setupPlayer();
  }, [number]);

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
          <Text style={styles.playerText}>{renderTime(progress.position)}</Text>
          <Text style={styles.playerText}>{renderTime(progress.duration)}</Text>
        </View>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.surface,
  },
  player: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playerText: {
    color: theme.text,
    fontSize: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.accent,
  },
});

export default AnthemAudioProgress;
