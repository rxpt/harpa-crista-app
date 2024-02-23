import React from 'react';
import {FlatList, Pressable, Text, View} from 'react-native';
import AnthemTitle from './Title';
import AnthemAuthor from './Author';
import {captureRef} from 'react-native-view-shot';
import {useAppContext} from '../../providers/AppProvider';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Share from 'react-native-share';
import {styles} from '../../utils/theme';
import AnthemPrevNext from './PrevNext';

const Anthem = () => {
  const sequenceRef = React.useRef(0);
  const listRef = React.useRef<FlatList>(null);
  const [lastTap, setLastTap] = React.useState(0);
  const [highlightedVerse, setHighlightedVerse] = React.useState(0);
  const {
    state: {fontSize, currentAnthem},
  } = useAppContext();
  const fontSizeValue = useSharedValue(fontSize);
  const fontSizeStyle = useAnimatedStyle(() => {
    return {
      fontSize: withTiming(fontSizeValue.value, {duration: 100}),
      lineHeight: withTiming(fontSizeValue.value * 1.25, {duration: 100}),
    };
  });

  React.useEffect(() => {
    fontSizeValue.value = fontSize;
  }, [fontSize, fontSizeValue]);

  React.useMemo(() => {
    if (currentAnthem) {
      listRef.current?.scrollToOffset({animated: true, offset: 0});
      setHighlightedVerse(0);
    }
  }, [currentAnthem]);

  const handleVersePress = (text: string) => {
    captureRef(listRef, {
      format: 'jpg',
      quality: 0.9,
    }).then(
      uri => {
        Share.open({
          url: uri,
          message: `"${text}"\n\n- Hino: ${currentAnthem.number}. ${currentAnthem.title}`,
        }).catch(() => {});
      },
      error => console.error('Oops!', error),
    );
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

  return (
    <FlatList
      ref={listRef}
      data={currentAnthem.verses}
      ListHeaderComponent={AnthemTitle}
      keyExtractor={item => item.sequence.toString()}
      renderItem={({
        item,
        index,
      }: {
        item: (typeof currentAnthem.verses)[0];
        index: number;
      }) => {
        if (index === 0) {
          sequenceRef.current = 0;
        }
        const sequence = !item.chorus && ++sequenceRef.current;
        const isChorus = item.chorus;
        const isHighlighted = highlightedVerse === item.sequence;
        const verseOddEvenStyle =
          item.sequence % 2 === 0
            ? styles.anthemContainerEven
            : styles.anthemContainerOdd;
        const verseContainerHighlightStyle =
          isHighlighted && styles.anthemContainerHighlight;
        const verseHighlightStyle = isHighlighted && styles.anthemHighlight;
        const verseStyle = isChorus ? styles.anthemChorus : styles.anthemLyrics;
        return (
          <Pressable
            key={item.sequence}
            onPress={() => handleDoubleTap(item.sequence)}
            onLongPress={() => handleVersePress(item.lyrics)}>
            <View
              style={[
                styles.flexRow,
                styles.anthemContainer,
                verseOddEvenStyle,
                verseContainerHighlightStyle,
              ]}>
              <Animated.Text
                style={[verseStyle, verseHighlightStyle, fontSizeStyle]}>
                {!item.chorus && (
                  <Text style={[styles.anthemNumber]}>{sequence}</Text>
                )}
                {item.lyrics}
              </Animated.Text>
            </View>
          </Pressable>
        );
      }}
      ListFooterComponent={
        <View>
          <AnthemAuthor />
          <AnthemPrevNext />
        </View>
      }
    />
  );
};

export default Anthem;
