import React from 'react';
import {Text, View, FlatList} from 'react-native';
import {useKeepAwake} from '@sayem314/react-native-keep-awake';
import lodash from 'lodash';
import {Verse} from '../utils/interfaces';
import verses from '../data/verses.json';
import styles from '../utils/styles';

const AnthemScreen: React.FC = ({route}: any) => {
  useKeepAwake();

  const {id} = route.params;
  const verse = lodash.orderBy(lodash.filter(verses, {anthemId: id}), [
    'order',
  ]) as Verse[];

  function renderVerse(anthem: Verse) {
    return (
      <Text
        key={anthem.id}
        style={[styles.versus, anthem.isChorus && styles.chorus]}>
        {anthem.verse}
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={verse}
        style={styles.content}
        renderItem={({item}) => renderVerse(item)}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default AnthemScreen;
