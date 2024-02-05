import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Anthem} from '../utils/interfaces';
import anthems from '../data/anthems.json';
import Item from '../components/Item';
import {styles} from '../utils/theme';
import AnthemFlatList from '../components/AnthemFlatList';

const HomeScreen: React.FC = ({route}: any) => {
  const search = route.params?.searchQuery || '';
  const [isMenuOpen, _] = useState(false);

  const filteredAnthem = anthems.filter((anthem: Anthem) => {
    return (
      anthem.title.toLowerCase().includes(search.toLowerCase()) ||
      anthem.id.toString().includes(search)
    );
  });

  if (isMenuOpen) {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Item
            screen="topicList"
            params={{
              title: 'Índice dos assuntos',
            }}
          />
        </ScrollView>
      </View>
    );
  }

  return <AnthemFlatList data={filteredAnthem} />;
};

const HomeScreenMemo = React.memo(HomeScreen);

export default HomeScreenMemo;
