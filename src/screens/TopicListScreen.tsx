import React, {useLayoutEffect} from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import {Link} from '@react-navigation/native';
import lodash from 'lodash';
import topics from '../data/topics.json';
import {materialColors} from 'react-native-typography';

const TopicsScreen: React.FC = ({navigation}: any) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Índice dos assuntos',
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {lodash.orderBy(topics, ['title'], ['asc']).map(topic => (
          <Link
            key={topic.id}
            to={{
              screen: 'topicItems',
              params: {
                topicId: topic.id,
                title: topic.title,
              },
            }}
            style={styles.button}>
            <Text style={styles.text}>{topic.title.toUpperCase()}</Text>
          </Link>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: materialColors.blackPrimary,
  },
  button: {
    padding: 16,
    backgroundColor: materialColors.blackTertiary,
    borderRadius: 8,
    margin: 8,
  },
  text: {
    color: materialColors.whitePrimary,
  },
});

export default TopicsScreen;
