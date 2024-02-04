import React, {useLayoutEffect} from 'react';
import {View, FlatList} from 'react-native';
import lodash from 'lodash';
import Item from '../components/Item';
import indexes from '../data/indexes.json';
import styles from '../utils/styles';

const TopicsScreen: React.FC = ({navigation}: any) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Índice dos assuntos',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={lodash.orderBy(indexes, ['title'], ['asc'])}
        renderItem={({item}) => <Item screen="topicItems" params={item} />}
        keyExtractor={item => item.title + item.anthems.length}
        contentContainerStyle={styles.content}
      />
    </View>
  );
};

const TopicListScreenMeno = React.memo(TopicsScreen);

export default TopicListScreenMeno;
