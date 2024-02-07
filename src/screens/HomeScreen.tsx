import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {Anthem} from '../utils/interfaces';
import anthems from '../data/anthems.json';
import Item from '../components/Item';
import {styles} from '../utils/theme';
import {useAppContext} from '../contexts/AppContext';
import AnthemFlatList from '../components/AnthemFlatList';

const HomeScreen: React.FC = () => {
  const {
    state: {searchQuery},
  } = useAppContext();
  const [isMenuOpen, _] = useState(false);

  const filteredAnthem = anthems.filter((anthem: Anthem) => {
    return (
      anthem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      anthem.id.toString().includes(searchQuery)
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
