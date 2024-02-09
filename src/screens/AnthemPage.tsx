import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {Text, Appbar, Divider} from 'react-native-paper';
import AnthemProgress from '../components/AnthemProgress';
import {activateKeepAwake} from '@sayem314/react-native-keep-awake';
import TrackPlayer, {useIsPlaying} from 'react-native-track-player';
import {useAppContext} from '../providers/AppProvider';
import AnthemVerses from '../components/AnthemVerses';
import AnthemsModal from '../components/AnthemsModal';
import IndexesModal from '../components/IndexesModal';
import {anthemAudioURL, getAnthem, randomAnthem} from '../utils';
import {styles} from '../utils/theme';

const AnthemPage: React.FC = () => {
  activateKeepAwake();

  const [anthem, setAnthem] = useState(getAnthem(1));
  const [searchIndex, setSearchIndex] = useState(-1);
  const [anthemsModalOpen, setAnthemsModalOpen] = useState(false);
  const [indexesModalOpen, setIndexesModalOpen] = useState(false);

  const isPlaying = useIsPlaying().playing;

  const {state, dispatch} = useAppContext();
  const [MIN_FONT_SIZE, MAX_FONT_SIZE] = [16, 26];

  const changeFontSize = (fontSize: number) => {
    if (fontSize > MAX_FONT_SIZE || fontSize < MIN_FONT_SIZE) {
      return;
    }

    dispatch({type: 'fontSize', payload: fontSize});
  };

  const increaseFontSize = () => {
    changeFontSize(state.fontSize + 1);
  };

  const decreaseFontSize = () => {
    changeFontSize(state.fontSize - 1);
  };

  useEffect(() => {
    if (!state.playerReady) {
      return;
    }

    (async () => {
      await TrackPlayer.reset();
      await TrackPlayer.load({
        url: anthemAudioURL(anthem.id),
        title: anthem.title,
        artist: anthem.author,
      });
    })();
  }, [anthem, state.playerReady]);

  return (
    <View style={styles.container}>
      <Appbar.Header mode="medium">
        <Appbar.Content title={`${anthem.id} - ${anthem.title}`} />
        {/* music music-note autorenew backup-restore bookmark-plus bookmark-remove format-annotation-minus format-annotation-plus heart heart-outline history  */}
        {state.playerReady && (
          <Appbar.Action
            icon={isPlaying ? 'pause' : 'play'}
            onPress={() => {
              if (isPlaying) {
                TrackPlayer.pause();
              } else {
                TrackPlayer.play();
              }
            }}
          />
        )}
        <Appbar.Action
          icon="format-annotation-minus"
          onPress={decreaseFontSize}
        />
        <Appbar.Action
          icon="format-annotation-plus"
          onPress={increaseFontSize}
        />
        <Appbar.Action
          icon="shuffle-variant"
          onPress={() => setAnthem(randomAnthem())}
        />
        <Appbar.Action
          icon="magnify"
          onPress={() => {
            setAnthemsModalOpen(true);
            setIndexesModalOpen(false);
          }}
        />
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => {
            setIndexesModalOpen(true);
            setAnthemsModalOpen(false);
          }}
        />
      </Appbar.Header>
      <Divider />
      <ScrollView>
        <AnthemVerses verses={anthem.verses} />
        <Divider />
        {anthem.author && (
          <Text variant="bodySmall" style={styles.author}>
            {anthem.author}
          </Text>
        )}
      </ScrollView>
      <AnthemProgress />
      <AnthemsModal
        open={anthemsModalOpen}
        searchIndex={searchIndex}
        onAnthemSelect={setAnthem}
        onSearchQueryChange={() => setSearchIndex(-1)}
        onDismiss={() => setAnthemsModalOpen(false)}
      />
      <IndexesModal
        open={indexesModalOpen}
        onSearchIndexChange={(index: number) => {
          setSearchIndex(index);
          setAnthemsModalOpen(true);
        }}
        onDismiss={() => setIndexesModalOpen(false)}
      />
    </View>
  );
};

export default React.memo(AnthemPage);
