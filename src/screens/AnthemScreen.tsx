import React, {useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {Text, Divider, FAB} from 'react-native-paper';
import {activateKeepAwake} from '@sayem314/react-native-keep-awake';
import {useAppContext} from '../providers/AppProvider';
import AnthemVerses from '../components/AnthemVerses';
import AnthemsModal from '../components/AnthemsModal';
import IndexesModal from '../components/IndexesModal';
import FavoritesModal from '../components/FavoritesModal';
import AnthemHeaderBar from '../components/AnthemHeaderBar';
import AnthemAudioProgress from '../components/AnthemAudioProgress';
import {anthemAudioURL, randomAnthem} from '../utils';
import {styles} from '../utils/theme';

const AnthemScreen: React.FC = () => {
  activateKeepAwake();

  const {state, dispatch} = useAppContext();
  const isFavorite = state.favorites.includes(state.currentAnthem.id);

  useEffect(() => {
    if (!state.playerReady) {
      return;
    }

    TrackPlayer.reset();
  }, [state.playerReady, state.currentAnthem]);

  return (
    <View style={styles.container}>
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
        <AnthemHeaderBar
          title={`${state.currentAnthem.id}. ${state.currentAnthem.title}`}
          buttons={[
            {
              icon: isFavorite ? 'heart' : 'heart-outline',
              action: () => {
                dispatch({
                  type: isFavorite ? 'REMOVE_FAVORITE' : 'ADD_FAVORITE',
                  payload: state.currentAnthem.id,
                });
              },
            },
            {
              icon: 'magnify',
              action: () => {
                dispatch({type: 'SET_SEARCH_INDEX', payload: -1});
                dispatch({type: 'SET_CURRENT_MODAL', payload: 'anthems'});
              },
              disabled: state.currentModal === 'anthems',
            },
          ]}
        />
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
      {/* More */}
      <FAB.Group
        open={state.currentModal === 'more'}
        visible
        icon={state.currentModal === 'more' ? 'dots-vertical' : 'plus'}
        actions={[
          {
            icon: 'star',
            label: 'Favoritos',
            onPress: () =>
              dispatch({type: 'SET_CURRENT_MODAL', payload: 'favorites'}),
          },
          {
            icon: 'shuffle-variant',
            label: 'Hino aleatório',
            onPress: () =>
              dispatch({type: 'SET_CURRENT_ANTHEM', payload: randomAnthem()}),
          },
          {
            icon: 'format-list-bulleted-square',
            label: 'Índices de Assuntos',
            onPress: () =>
              dispatch({type: 'SET_CURRENT_MODAL', payload: 'indexes'}),
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
          dispatch({type: 'SET_CURRENT_MODAL', payload: open ? 'more' : null});
        }}
        onPress={() => {
          dispatch({type: 'SET_CURRENT_MODAL', payload: 'more'});
        }}
      />
    </View>
  );
};

export default React.memo(AnthemScreen);
