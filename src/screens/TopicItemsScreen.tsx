import React, {useLayoutEffect} from 'react';
import anthemsJson from '../data/anthems.json';
import AnthemFlatList from '../components/AnthemFlatList';

const TopicItemsScreen: React.FC = ({route, navigation}: any) => {
  const {anthems, title} = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);

  const filteredAnthems = anthemsJson.filter((anthem: any) =>
    anthems.includes(anthem.id),
  );

  return <AnthemFlatList data={filteredAnthems} />;
};

const TopicItemsScreenMemo = React.memo(TopicItemsScreen);

export default TopicItemsScreenMemo;
