import React from 'react';
import {FlatList, Pressable, View, BackHandler} from 'react-native';
import {useConfigHooks, useAnthemHooks} from '../../store/hooks';
import AnthemTitle from './Title';
import AnthemAuthor from './Author';
import {captureScreen} from 'react-native-view-shot';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Share from 'react-native-share';
import GestureHandler from '../Gestures';
import {flex, styles} from '../../utils/styles';
import Text from '../Text';

const AnimatedText = Animated.createAnimatedComponent(Text);

const Anthem = () => {
  const config = useConfigHooks();
  const anthems = useAnthemHooks();
  const currentAnthem = anthems.getCurrent();
  const {current: fontSize} = config.getFontSize();

  const sequenceRef = React.useRef(0);
  const listRef = React.useRef<FlatList>(null);

  const [lastTap, setLastTap] = React.useState(0);
  const [highlightedVerse, setHighlightedVerse] = React.useState(0);

  const fontSizeValue = useSharedValue(fontSize);
  const fontSizeStyle = useAnimatedStyle(() => {
    return {
      fontSize: fontSizeValue.value,
      lineHeight: fontSizeValue.value * 1.25,
    };
  });

  React.useEffect(() => {
    const backAction = () => {
      setHighlightedVerse(0);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  React.useMemo(() => {
    fontSizeValue.value = fontSize;
  }, [fontSize, fontSizeValue]);

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
    captureScreen({
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
      setHighlightedVerse(highlightedVerse === data ? 0 : data);
    } else {
      setLastTap(now);
    }
  };

  return (
    <GestureHandler>
      <FlatList
        ref={listRef}
        data={currentAnthem.verses}
        ListHeaderComponent={
          <AnthemTitle
            title={currentAnthem.title}
            number={currentAnthem.number}
          />
        }
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
              ? styles.anthem.containerEven
              : styles.anthem.containerOdd;
          const verseContainerHighlightStyle =
            isHighlighted && styles.anthem.containerHighlight;
          const verseHighlightStyle = isHighlighted && styles.anthem.highlight;
          const verseStyle = isChorus
            ? styles.anthem.chorus
            : styles.anthem.lyrics;
          return (
            <Pressable
              key={item.sequence}
              onPress={() => handleDoubleTap(item.sequence)}
              onLongPress={() => handleVersePress(item.lyrics)}>
              <View
                style={[
                  flex.flexRow,
                  styles.anthem.container,
                  verseOddEvenStyle,
                  verseContainerHighlightStyle,
                ]}>
                <AnimatedText
                  style={[verseStyle, verseHighlightStyle, fontSizeStyle]}>
                  {!item.chorus && (
                    <Text style={[styles.anthem.number]}>{sequence}</Text>
                  )}
                  {item.lyrics}
                </AnimatedText>
              </View>
            </Pressable>
          );
        }}
        ListFooterComponent={<AnthemAuthor author={currentAnthem.author} />}
      />
    </GestureHandler>
  );
};

export default Anthem;
