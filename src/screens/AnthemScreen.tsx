import React, {useEffect} from 'react';
import {Text, View, ScrollView, StyleSheet} from 'react-native';
import {AudioPlayer} from 'react-native-simple-audio-player';
import {
  activateKeepAwake,
  deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';
import {useIsFocused} from '@react-navigation/native';
import {padStart} from 'lodash';
import {Verse} from '../utils/interfaces';
import verses from '../data/anthems.json';
import styles from '../utils/styles';
import {materialColors} from 'react-native-typography';

const AnthemScreen: React.FC = ({route}: any) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      activateKeepAwake();
    } else {
      deactivateKeepAwake();
    }
  }, [isFocused]);

  const {id} = route.params;
  const verse = verses[id].verses as Verse[];
  //const title = verses[id].title;
  const author = verses[id].author;

  function renderVerse(anthem: Verse) {
    return (
      <Text
        key={anthem.sequence}
        style={[
          styles.verse,
          anthem.sequence % 2 === 0 && styles.verseEven,
          anthem.chorus && styles.chorus,
        ]}>
        {anthem.lyrics
          .split('\n')
          .map(line => line.trim())
          .filter(line => isNaN(parseInt(line, 10)) && line !== '')
          .join('\n')
          .trim()}
      </Text>
    );
  }

  const anthemAudioUrl = `https://harpa.nyc3.digitaloceanspaces.com/${padStart(
    id,
    3,
    '0',
  )}.mp3`;

  return (
    <View style={styles.container}>
      <ScrollView>
        <AudioPlayer url={anthemAudioUrl} style={AudioStyles.audioPlayer} />
        {verse.map(renderVerse)}
        {author && <Text style={styles.author}>{author}</Text>}
      </ScrollView>
    </View>
  );
};

const AudioStyles = StyleSheet.create({
  audioPlayer: {
    backgroundColor: materialColors.blackPrimary,
    paddingTop: 20,
  },
});

const AnthemScreenMemo = React.memo(AnthemScreen);

export default AnthemScreenMemo;
