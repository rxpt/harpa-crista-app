import React, {useLayoutEffect} from 'react';
import {View, FlatList} from 'react-native';
import lodash from 'lodash';
import topics from '../data/topics.json';
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
        data={lodash.orderBy(topics, ['title'], ['asc'])}
        renderItem={({item}) => (
          <Item
            screen="topicItems"
            params={{
              topicId: item.id,
              title: item.title,
            }}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default TopicsScreen;
