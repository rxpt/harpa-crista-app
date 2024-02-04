import React, {useLayoutEffect} from 'react';
import {View, FlatList} from 'react-native';
import lodash from 'lodash';
import indexes from '../data/indexes.json';
import Item from '../components/Item';
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
        renderItem={({item}) => (
          <Item
            screen="topicItems"
            params={{
              title: item.title,
              anthems: item.anthems,
            }}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.content}
      />
    </View>
  );
};

const TopicListScreenMeno = React.memo(TopicsScreen);

export default TopicListScreenMeno;
