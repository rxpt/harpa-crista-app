import React from 'react';
import {Text, View} from 'react-native';
import AnthemAudioProgress from './AudioProgress';
import {useAppContext} from '../../providers/AppProvider';
import {styles} from '../../utils/theme';
import {padding, margin, flex} from '../../utils/styles';

const AnthemTitle = () => {
  const {
    state: {currentAnthem},
  } = useAppContext();

  if (!currentAnthem) {
    return null;
  }

  return (
    <View>
      <View style={[padding(20), margin(30, 'vertical'), flex.flex1]}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[flex.flexWrap, flex.flex1, styles.anthemTitle]}>
          <Text style={styles.anthemSubtitle}>{currentAnthem?.number}. </Text>
          {currentAnthem?.title}
        </Text>
      </View>

      <AnthemAudioProgress />
    </View>
  );
};

export default AnthemTitle;
