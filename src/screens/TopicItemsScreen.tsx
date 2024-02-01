import React, {useLayoutEffect} from 'react';
import anthems from '../data/anthems.json';
import anthemTopics from '../data/anthems_topics.json';
import AnthemFlatList from '../components/AnthemFlatList';

const TopicItemsScreen: React.FC = ({route, navigation}: any) => {
  const {topicId, title} = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);

  const filteredAnthem = anthemTopics
    .filter((anthemTopic: any) => {
      return anthemTopic.topicId === topicId;
    })
    .map((anthemTopic: any) => {
      return anthems.find((anthem: any) => anthem.id === anthemTopic.anthemId);
    });

  return <AnthemFlatList data={filteredAnthem} />;
};

export default TopicItemsScreen;
