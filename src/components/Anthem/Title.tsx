import React from 'react';
import {Text, View} from 'react-native';
import AnthemAudioProgress from './AudioProgress';
import {useAppContext} from '../../providers/AppProvider';
import {styles} from '../../utils/theme';

const AnthemTitle = () => {
  const {
    state: {currentAnthem},
  } = useAppContext();

  if (!currentAnthem) {
    return null;
  }

  return (
    <View>
      <View style={[styles.padding, styles.marginVertical, styles.stretched]}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.wrap, styles.stretched, styles.anthemTitle]}>
          <Text style={styles.anthemSubtitle}>{currentAnthem?.number}. </Text>
          {currentAnthem?.title}
        </Text>
      </View>

      <AnthemAudioProgress />
    </View>
  );
};

export default AnthemTitle;
