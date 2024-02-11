import React from 'react';
import {View, ScrollView} from 'react-native';
import {activateKeepAwake} from '@sayem314/react-native-keep-awake';
import AnthemsModal from '../components/modals/AnthemsModal';
import IndexesModal from '../components/modals/IndexesModal';
import FavoritesModal from '../components/modals/FavoritesModal';
import HistoryModal from '../components/modals/HistoryModal';
import AnthemTitle from '../components/AnthemTitle';
import AnthemVerses from '../components/AnthemVerses';
import AnthemAuthor from '../components/AnthemAuthor';
import AnthemHeaderBar from '../components/AnthemHeaderBar';
import AnthemAudioProgress from '../components/AnthemAudioProgress';
import MenuButton from '../components/MenuButton';
import {styles} from '../utils/theme';

const AnthemScreen: React.FC = () => {
  activateKeepAwake();

  return (
    <View style={styles.container}>
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
        <AnthemHeaderBar />
        <AnthemTitle />
        <AnthemVerses />
        <AnthemAuthor />
      </ScrollView>
      <AnthemAudioProgress />
      <AnthemsModal />
      <IndexesModal />
      <FavoritesModal />
      <HistoryModal />
      <MenuButton />
    </View>
  );
};

export default React.memo(AnthemScreen);
