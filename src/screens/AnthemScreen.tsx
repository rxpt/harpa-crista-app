import React, {useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import {Text, Divider, FAB, Snackbar} from 'react-native-paper';
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
import HistoryModal from '../components/HistoryModal';

const AnthemScreen: React.FC = () => {
  activateKeepAwake();

  const {state, dispatch} = useAppContext();
  const isFavorite = state.favorites.includes(state.currentAnthem.id);

  const [visibleSnackBar, setVisibleSnackBar] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState('');
  const onDismissSnackBar = () => setVisibleSnackBar(false);

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
                setVisibleSnackBar(true);
                setSnackBarMessage(
                  isFavorite
                    ? 'Hino removido dos favoritos'
                    : 'Hino adicionado aos favoritos',
                );
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
      <HistoryModal />
      {/* More */}
      <FAB.Group
        open={state.bottomMenu}
        visible
        icon={state.bottomMenu ? 'close' : 'plus'}
        actions={[
          {
            icon: 'star',
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
      <Snackbar
        duration={2000}
        visible={visibleSnackBar}
        onDismiss={onDismissSnackBar}
        onIconPress={() => setVisibleSnackBar(false)}>
        {snackBarMessage}
      </Snackbar>
    </View>
  );
};

export default React.memo(AnthemScreen);
