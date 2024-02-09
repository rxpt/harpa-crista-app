import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {Text, Divider, FAB} from 'react-native-paper';
import TrackPlayer, {useIsPlaying} from 'react-native-track-player';
import {activateKeepAwake} from '@sayem314/react-native-keep-awake';
import {useAppContext} from '../providers/AppProvider';
import AnthemVerses from '../components/AnthemVerses';
import AnthemsModal from '../components/AnthemsModal';
import IndexesModal from '../components/IndexesModal';
import AnthemHeaderBar from '../components/AnthemHeaderBar';
import AnthemAudioProgress from '../components/AnthemAudioProgress';
import {anthemAudioURL, getAnthem, randomAnthem} from '../utils';
import {styles} from '../utils/theme';
import FavoritesModal from '../components/FavoritesModal';

const AnthemScreen: React.FC = () => {
  activateKeepAwake();

  const [anthem, setAnthem] = useState(getAnthem(1));
  const [searchIndex, setSearchIndex] = useState(-1);
  const [currentModal, setCurrentModal] = useState<
    'anthems' | 'indexes' | 'favorites' | undefined
  >('anthems');
  const [openMenu, setOpenMenu] = useState(false);

  const {state, dispatch} = useAppContext();
  const isPlaying = useIsPlaying().playing;
  const {favorites} = state;
  const isFavorite = favorites.includes(anthem.id);

  useEffect(() => {
    if (!state.playerReady) {
      return;
    }

    TrackPlayer.reset();
  }, [state.playerReady, anthem]);

  return (
    <View style={styles.container}>
      <ScrollView stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll>
        <AnthemHeaderBar
          title={`${anthem.id}. ${anthem.title}`}
          buttons={[
            {
              icon: isFavorite ? 'heart' : 'heart-outline',
              action: () => {
                dispatch({
                  type: isFavorite ? 'REMOVE_FAVORITE' : 'ADD_FAVORITE',
                  payload: anthem.id,
                });
              },
            },
            {
              icon: 'magnify',
              action: () => {
                setSearchIndex(-1);
                setCurrentModal('anthems');
              },
              disabled: currentModal === 'anthems',
            },
          ]}
        />
        <AnthemVerses verses={anthem.verses} />
        <Divider />
        <Text variant="bodySmall" style={styles.author}>
          {anthem?.author || 'Autor desconhecido'}
        </Text>
      </ScrollView>
      <AnthemAudioProgress />
      <AnthemsModal
        open={currentModal === 'anthems'}
        searchIndex={searchIndex}
        onAnthemSelect={setAnthem}
        onSearchQueryChange={() => setSearchIndex(-1)}
        onDismiss={() => setCurrentModal(undefined)}
      />
      <IndexesModal
        open={currentModal === 'indexes'}
        onSearchIndexChange={(index: number) => {
          setSearchIndex(index);
          setCurrentModal('anthems');
        }}
        onDismiss={() => setCurrentModal(undefined)}
      />
      <FavoritesModal
        open={currentModal === 'favorites'}
        onAnthemSelect={setAnthem}
        onDismiss={() => setCurrentModal(undefined)}
      />
      {/* More */}
      <FAB.Group
        open={openMenu}
        visible
        icon={openMenu ? 'dots-vertical' : 'plus'}
        actions={[
          {
            icon: 'star',
            label: 'Favoritos',
            onPress: () => setCurrentModal('favorites'),
          },
          {
            icon: 'shuffle-variant',
            label: 'Hino aleatório',
            onPress: () => setAnthem(randomAnthem()),
          },
          {
            icon: 'format-list-bulleted-square',
            label: 'Índices de Assuntos',
            onPress: () => setCurrentModal('indexes'),
          },
          {
            icon: isPlaying ? 'stop' : 'play',
            label: isPlaying ? 'Parar' : 'Ouvir hino',
            onPress: async () => {
              if (isPlaying) {
                await TrackPlayer.stop();
              } else {
                await TrackPlayer.load({
                  url: anthemAudioURL(anthem.id),
                  title: anthem.title,
                  artist: anthem.author,
                });
                await TrackPlayer.play();
              }
            },
          },
        ]}
        onStateChange={({open}) => setOpenMenu(open)}
        onPress={() => {
          setOpenMenu(!openMenu);
        }}
      />
    </View>
  );
};

export default React.memo(AnthemScreen);
