import React from 'react';
import {styles} from '../utils/theme';
import {Text} from 'react-native-paper';
import {useAppContext} from '../providers/AppProvider';

const AnthemVerses = () => {
  const {
    state: {fontSize, currentAnthem},
  } = useAppContext();

  if (!currentAnthem) {
    return null;
  }

  let sequence = 0;

  return currentAnthem.verses.map(verse => {
    !verse.chorus && sequence++;

    return (
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
        {!verse.chorus && (
          <Text variant="bodySmall" style={styles.bold}>
            {sequence}
            {'     '}
          </Text>
        )}
        {verse.lyrics}
      </Text>
    );
  });
};

export default AnthemVerses;
