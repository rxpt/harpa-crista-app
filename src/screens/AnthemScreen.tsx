import React, {useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {Text, Divider, FAB} from 'react-native-paper';
import {activateKeepAwake} from '@sayem314/react-native-keep-awake';
import {useAppContext} from '../providers/AppProvider';
import AnthemVerses from '../components/AnthemVerses';
import AnthemsModal from '../components/modals/AnthemsModal';
import IndexesModal from '../components/modals/IndexesModal';
import FavoritesModal from '../components/modals/FavoritesModal';
import HistoryModal from '../components/modals/HistoryModal';
import AnthemTitle from '../components/AnthemTitle';
import AnthemHeaderBar from '../components/AnthemHeaderBar';
import AnthemAudioProgress from '../components/AnthemAudioProgress';
import {anthemAudioURL, randomAnthem} from '../utils';
import {styles} from '../utils/theme';

const AnthemScreen: React.FC = () => {
  activateKeepAwake();

  const {state, dispatch} = useAppContext();

  useEffect(() => {
    if (!state.playerReady) {
      return;
    }

    TrackPlayer.reset();
  }, [state.playerReady, state.currentAnthem]);

  return (
    <View style={styles.container}>
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
        <AnthemHeaderBar />
        <AnthemTitle />
        <AnthemVerses />
        <Divider />
        <Text variant="bodySmall" style={styles.author}>
          {state.currentAnthem?.author || 'Autor desconhecido'}
        </Text>
      </ScrollView>
      <AnthemAudioProgress />
      <AnthemsModal />
      <IndexesModal />
      <FavoritesModal />
      <HistoryModal />
      {/* More */}
      <FAB.Group
        open={state.bottomMenu}
        visible
        icon={state.bottomMenu ? 'close' : 'plus'}
        actions={[
          {
            icon: 'heart-outline',
            label: 'Favoritos',
            onPress: () =>
              dispatch({type: 'SET_CURRENT_MODAL', payload: 'favorites'}),
          },
          {
            icon: 'history',
            label: 'Histórico',
            onPress: () =>
              dispatch({type: 'SET_CURRENT_MODAL', payload: 'history'}),
          },
          {
            icon: 'format-list-bulleted-square',
            label: 'Índices de Assuntos',
            onPress: () =>
              dispatch({type: 'SET_CURRENT_MODAL', payload: 'indexes'}),
          },
          {
            icon: 'magnify',
            label: 'Pesquisar hinos',
            onPress: () =>
              dispatch({type: 'SET_CURRENT_MODAL', payload: 'anthems'}),
          },
          {
            icon: 'shuffle-variant',
            label: 'Hino aleatório',
            onPress: () =>
              dispatch({type: 'SET_CURRENT_ANTHEM', payload: randomAnthem()}),
          },
          {
            icon: state.isPlaying ? 'stop' : 'play',
            label: state.isPlaying ? 'Parar' : 'Ouvir hino',
            onPress: async () => {
              if (state.isPlaying) {
                await TrackPlayer.stop();
              } else {
                await TrackPlayer.load({
                  url: anthemAudioURL(state.currentAnthem.id),
                  title: state.currentAnthem.title,
                  artist: state.currentAnthem.author,
                });
                await TrackPlayer.play();
              }
            },
          },
        ]}
        onStateChange={({open}) => {
          dispatch({type: 'SET_BOTTOM_MENU', payload: open});
        }}
        onPress={() => {
          dispatch({type: 'SET_BOTTOM_MENU', payload: true});
        }}
      />
    </View>
  );
};

export default React.memo(AnthemScreen);
