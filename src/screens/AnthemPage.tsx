import React, {useState, useRef, useEffect} from 'react';
import {View, ScrollView, TouchableOpacity, Dimensions} from 'react-native';
import {Text, Appbar, Divider, Searchbar, Button} from 'react-native-paper';
import AnthemProgress from '../components/AnthemProgress';
import {activateKeepAwake} from '@sayem314/react-native-keep-awake';
import {useAppContext} from '../providers/AppProvider';
import {BottomSheetFlatList, BottomSheetModal} from '@gorhom/bottom-sheet';
import TrackPlayer, {useIsPlaying} from 'react-native-track-player';
import {sample, padStart} from 'lodash';
import {Anthem, Verse} from '../utils/interfaces';
import {styles, theme} from '../utils/theme';
import {searchAnthems} from '../utils';
import anthems from '../data/anthems.json';
import indexes from '../data/indexes.json';

const AnthemPage: React.FC = () => {
  activateKeepAwake();

  const [searchQuery, setSearchQuery] = useState('');
  const isPlaying = useIsPlaying().playing;

  const anthemsModalRef = useRef(null);
  const anthemsModalFlatListRef = useRef(null);
  const indexesModalRef = useRef(null);

  const {state, dispatch} = useAppContext();
  const [MIN_FONT_SIZE, MAX_FONT_SIZE] = [16, 26];
  const {height} = Dimensions.get('window');

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

  const [anthem, setAnthem] = useState<Anthem>(anthems[0]);
  const [anthemListIndex, setAnthemListIndex] = useState(-1);

  useEffect(() => {
    if (!state.playerReady) {
      return;
    }

    (async () => {
      await TrackPlayer.reset();
      await TrackPlayer.load({
        url: `https://harpa.nyc3.digitaloceanspaces.com/${padStart(
          anthem.id.toString(),
          3,
          '0',
        )}.mp3`,
        title: anthem.title,
        artist: anthem.author,
      });
    })();
  }, [anthem, state.playerReady]);

  const randomAnthem = () => {
    setAnthem(sample(anthems) as Anthem);
  };

  const renderVerse = (anthemVerse: Verse) => {
    return (
      <Text
        key={anthemVerse.sequence}
        variant="bodyLarge"
        style={[
          styles.verse,
          anthemVerse.sequence % 2 === 0 &&
            !anthemVerse.chorus &&
            styles.verseEven,
          anthemVerse.chorus && styles.chorus,
          {
            fontSize: state.fontSize,
            lineHeight: state.fontSize * 1.25,
          },
        ]}>
        {anthemVerse.lyrics}
      </Text>
    );
  };

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
        <Appbar.Action icon="shuffle-variant" onPress={randomAnthem} />
        <Appbar.Action
          icon="magnify"
          onPress={() => {
            if (anthemListIndex > -1) {
              setAnthemListIndex(-1);
            }

            (anthemsModalRef.current as any)?.present();
          }}
        />
        <Appbar.Action
          icon="dots-vertical"
          onPress={() => {
            (indexesModalRef.current as any)?.present();
          }}
        />
      </Appbar.Header>
      <Divider />
      <ScrollView>
        {anthem.verses.map(renderVerse)}
        <Divider />
        {anthem.author && (
          <Text variant="bodySmall" style={styles.author}>
            {anthem.author}
          </Text>
        )}
      </ScrollView>
      <AnthemProgress />
      {/* Anthems list */}
      <BottomSheetModal
        ref={anthemsModalRef}
        snapPoints={[height]}
        backgroundStyle={{
          backgroundColor: theme.colors.onSecondary,
        }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.secondary,
        }}>
        <Searchbar
          placeholder="Digite o número ou título"
          onChangeText={text => {
            if (anthemListIndex > -1) {
              setAnthemListIndex(-1);
            }

            setSearchQuery(text);
          }}
          onClearIconPress={() => {
            setSearchQuery('');
          }}
          value={searchQuery}
          style={styles.marginHorizontal}
        />
        <BottomSheetFlatList
          ref={anthemsModalFlatListRef}
          data={searchAnthems(searchQuery, anthemListIndex)}
          initialNumToRender={5}
          contentContainerStyle={[styles.padding, styles.gap]}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setAnthem(item);
                    (anthemsModalRef.current as any)?.dismiss();
                  }}>
                  <View style={[styles.flexRow, styles.alignCenter]}>
                    {item.id && (
                      <View style={styles.number}>
                        <Text style={styles.centered}>{item.id}</Text>
                      </View>
                    )}
                    <Text variant="titleMedium" style={styles.title}>
                      {item.title}
                    </Text>
                  </View>
                </TouchableOpacity>
                <Divider />
              </View>
            );
          }}
        />
      </BottomSheetModal>
      {/* Indexes list */}
      <BottomSheetModal
        ref={indexesModalRef}
        snapPoints={[height / 2]}
        backgroundStyle={{
          backgroundColor: theme.colors.onSecondary,
        }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.secondary,
        }}>
        <Appbar.Header
          mode="center-aligned"
          style={{
            backgroundColor: theme.colors.onSecondary,
          }}>
          <Appbar.Content title="Índice de Assuntos" />
        </Appbar.Header>
        <Divider />
        <BottomSheetFlatList
          data={indexes}
          initialNumToRender={5}
          contentContainerStyle={[styles.padding, styles.gap]}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <Button
                mode="outlined"
                onPress={() => {
                  (indexesModalRef.current as any)?.dismiss();
                  setAnthemListIndex(item.anthems?.length > 0 ? index : -1);
                  (anthemsModalRef.current as any)?.present();
                }}>
                <Text>{item.title}</Text>
              </Button>
            );
          }}
        />
      </BottomSheetModal>
    </View>
  );
};

export default React.memo(AnthemPage);
