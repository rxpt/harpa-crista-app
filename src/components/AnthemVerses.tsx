import React from 'react';
import {View} from 'react-native';
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
      <View
        key={verse.sequence}
        style={[
          styles.flexRow,
          styles.verse,
          verse.chorus && styles.chorus,
          verse.sequence % 2 === 0 && !verse.chorus && styles.verseEven,
        ]}>
        {!verse.chorus && (
          <Text variant="bodySmall" style={styles.verseNumber}>
            {sequence}
          </Text>
        )}
        <Text
          variant="bodyLarge"
          style={[
            styles.verse,
            verse.chorus && styles.chorusText,
            {
              fontSize: fontSize,
              lineHeight: fontSize * 1.25,
            },
          ]}>
          {verse.lyrics}
        </Text>
      </View>
    );
  });
};

export default AnthemVerses;
