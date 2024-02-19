import React from 'react';
import {View, FlatList, Pressable} from 'react-native';
import {
  activateKeepAwake,
  deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';
import AnthemsModal from '../components/modals/AnthemsModal';
import IndexesModal from '../components/modals/IndexesModal';
import FavoritesModal from '../components/modals/FavoritesModal';
import HistoryModal from '../components/modals/HistoryModal';
import AnthemTitle from '../components/AnthemTitle';
import AnthemAuthor from '../components/AnthemAuthor';
import AnthemHeaderBar from '../components/AnthemHeaderBar';
import AnthemAudioProgress from '../components/AnthemAudioProgress';
import {useAppContext} from '../providers/AppProvider';
import {styles} from '../utils/theme';
import {Text} from 'react-native-paper';
import AnthemPrevNext from '../components/AnthemPrevNext';
import MenuModal from '../components/modals/MenuModal';
import Share from 'react-native-share';

const AnthemScreen: React.FC = () => {
  const listRef = React.useRef<FlatList>(null);
  const [lastTap, setLastTap] = React.useState(0);
  const [highlightedVerse, setHighlightedVerse] = React.useState(0);
  const {
    state: {fontSize, currentAnthem},
  } = useAppContext();

  React.useLayoutEffect(() => {
    activateKeepAwake();

    return () => {
      deactivateKeepAwake();
    };
  }, []);

  React.useMemo(() => {
    if (currentAnthem) {
      listRef.current?.scrollToOffset({animated: true, offset: 0});
      setHighlightedVerse(0);
    }
  }, [currentAnthem]);

  if (!currentAnthem) {
    return null;
  }

  const handleVersePress = (text: string) => {
    Share.open({
      message: `"${text}"\n\n- Hino: ${currentAnthem.id}. ${currentAnthem.title}`,
    }).catch(() => {});
  };

  const handleDoubleTap = (data: any) => {
    const now = Date.now();
    if (lastTap && now - lastTap < 300) {
      if (highlightedVerse === data) {
        setHighlightedVerse(0);
      } else {
        setHighlightedVerse(data);
      }
    } else {
      setLastTap(now);
    }
  };

  let sequence = 0;

  return (
    <View style={styles.container}>
      <AnthemHeaderBar />
      <FlatList
        ref={listRef}
        data={currentAnthem?.verses}
        ListHeaderComponent={AnthemTitle}
        keyExtractor={item => item.sequence.toString()}
        renderItem={({item}) => {
          !item.chorus && sequence++;

          return (
            <Pressable
              key={item.sequence}
              onPress={() => handleDoubleTap(item.sequence)}
              onLongPress={() => handleVersePress(item.lyrics)}>
              <View
                style={[
                  styles.flexRow,
                  styles.verseContainer,
                  item.chorus && styles.chorus,
                  item.sequence % 2 === 0 ? styles.verseEven : styles.verseOdd,
                  highlightedVerse === item.sequence && styles.highlightedVerse,
                ]}>
                {!item.chorus && (
                  <Text
                    variant="bodySmall"
                    style={[
                      styles.verseNumber,
                      {
                        lineHeight: fontSize,
                      },
                    ]}>
                    {sequence}
                  </Text>
                )}
                <Text
                  variant="bodyLarge"
                  style={[
                    styles.verseContainer,
                    item.chorus && styles.chorusContent,
                    {
                      fontSize: fontSize,
                      lineHeight: fontSize * 1.25,
                    },
                  ]}>
                  {item.lyrics}
                </Text>
              </View>
            </Pressable>
          );
        }}
        ListFooterComponent={<AnthemAuthor />}
      />
      <AnthemAudioProgress />
      <AnthemPrevNext />
      <AnthemsModal />
      <IndexesModal />
      <HistoryModal />
      <FavoritesModal />
      <MenuModal />
    </View>
  );
};

export default React.memo(AnthemScreen);
