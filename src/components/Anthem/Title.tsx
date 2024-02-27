import React from 'react';
import {Text, View} from 'react-native';
import AnthemAudioProgress from './AudioProgress';
import {styles, padding, margin, flex} from '../../utils/styles';

const AnthemTitle = ({title, number}: {title: string; number: number}) => {
  return (
    <View>
      <View style={[padding(20), margin(20, 'vertical'), flex.flex1]}>
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          style={[flex.flexWrap, flex.flex1, styles.anthem.title]}>
          <Text style={styles.anthem.subtitle}>{number}. </Text>
          {title}
        </Text>
      </View>

      <AnthemAudioProgress number={number} />
    </View>
  );
};

export default AnthemTitle;
