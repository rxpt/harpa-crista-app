import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {Text, Divider} from 'react-native-paper';
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

const AnthemScreen: React.FC = () => {
  activateKeepAwake();

  const [anthem, setAnthem] = useState(getAnthem(1));
  const [searchIndex, setSearchIndex] = useState(-1);
  const [anthemsModalOpen, setAnthemsModalOpen] = useState(true);
  const [indexesModalOpen, setIndexesModalOpen] = useState(false);

  const {state} = useAppContext();
  const isPlaying = useIsPlaying().playing;

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
              icon: isPlaying ? 'stop' : 'play',
              label: isPlaying ? 'Stop' : 'Play',
              action: async () => {
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
              disabled: !state.playerReady,
            },
            {
              icon: 'shuffle-variant',
              label: 'Random',
              action: () => setAnthem(randomAnthem()),
            },
            {
              icon: 'format-list-bulleted-square',
              label: 'Indexes',
              action: () => setIndexesModalOpen(true),
              disabled: indexesModalOpen,
            },
            {
              icon: 'magnify',
              label: 'Search',
              action: () => setAnthemsModalOpen(true),
              disabled: anthemsModalOpen,
            },
          ]}
        />
        <AnthemVerses verses={anthem.verses} />
        <Divider />
        {anthem.author && (
          <Text variant="bodySmall" style={styles.author}>
            {anthem.author}
          </Text>
        )}
      </ScrollView>
      <AnthemAudioProgress />
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

export default React.memo(AnthemScreen);
