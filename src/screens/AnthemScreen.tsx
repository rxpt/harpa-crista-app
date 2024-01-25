import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {robotoWeights, materialColors, human} from 'react-native-typography';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';
import lodash from 'lodash';
import {Verse} from '../utils/interfaces';
import verses from '../data/verses.json';

const AnthemScreen: React.FC = ({route}: any) => {
  useKeepAwake();

  const {id} = route.params;
  const verse = lodash.orderBy(lodash.filter(verses, {idAnthem: id}), [
    'order',
  ]) as Verse[];

  function renderVerse(anthem: Verse) {
    return (
      <Text
        key={anthem.id}
        style={[styles.content, anthem.isChorus && styles.chorus]}>
        {anthem.verse}
      </Text>
    );
  }

  return (
    <View style={styles.main}>
      <ScrollView contentContainerStyle={styles.container}>
        {verse.map(renderVerse)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: materialColors.blackPrimary,
  },
  container: {
    padding: 20,
  },
  content: {
    ...human.bodyWhiteObject,
    ...robotoWeights.light,
  },
  chorus: {
    textAlign: 'right',
    fontStyle: 'italic',
    ...robotoWeights.bold,
  },
});

export default AnthemScreen;
