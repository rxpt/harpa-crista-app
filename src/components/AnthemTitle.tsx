import React from 'react';
import {Text} from 'react-native-paper';
import {useAppContext} from '../providers/AppProvider';
import {styles} from '../utils/theme';
import AnthemAudioProgress from './AnthemAudioProgress';
import {View} from 'react-native';

const AnthemTitle = () => {
  const {state} = useAppContext();

  if (!state.currentAnthem) {
    return null;
  }

  return (
    <View>
      <Text
        variant="titleLarge"
        numberOfLines={1}
        ellipsizeMode="tail"
        style={[
          styles.padding,
          styles.marginVertical,
          styles.wrap,
          styles.stretched,
        ]}>
        <Text
          variant="titleMedium"
          style={{
            color: styles.verseNumber.color,
          }}>
          {state.currentAnthem?.id}.{' '}
        </Text>
        {state.currentAnthem?.title}
      </Text>
      <AnthemAudioProgress />
    </View>
  );
};

export default AnthemTitle;
