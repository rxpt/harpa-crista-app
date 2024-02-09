import React from 'react';
import {styles} from '../utils/theme';
import {Text} from 'react-native-paper';
import {useAppContext} from '../providers/AppProvider';
import {Verse} from '../utils/interfaces';

const AnthemVerses = ({verses}: {verses: Verse[]}) => {
  const {
    state: {fontSize},
  } = useAppContext();

  return verses.map(verse => (
    <Text
      key={verse.sequence}
      variant="bodyLarge"
      style={[
        styles.verse,
        verse.sequence % 2 === 0 && !verse.chorus && styles.verseEven,
        verse.chorus && styles.chorus,
        {
          fontSize: fontSize,
          lineHeight: fontSize * 1.25,
        },
      ]}>
      {verse.lyrics}
    </Text>
  ));
};

export default AnthemVerses;
