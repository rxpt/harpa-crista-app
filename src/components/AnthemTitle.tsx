import React from 'react';
import {Text, View} from 'react-native';
import AnthemAudioProgress from './AnthemAudioProgress';
import {useAppContext} from '../providers/AppProvider';
import {styles} from '../utils/theme';

const AnthemTitle = () => {
  const {state} = useAppContext();

  if (!state.currentAnthem) {
    return null;
  }

  return (
    <View>
      <View style={[styles.padding, styles.marginVertical, styles.stretched]}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[styles.wrap, styles.stretched, styles.anthemTitle]}>
          <Text style={styles.anthemSubtitle}>{state.currentAnthem?.id}. </Text>
          {state.currentAnthem?.title}
        </Text>
      </View>

      <AnthemAudioProgress />
    </View>
  );
};

export default AnthemTitle;
