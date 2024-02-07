import React, {useEffect, useRef} from 'react';
import {View, ScrollView} from 'react-native';
import {Text, Appbar, Divider} from 'react-native-paper';
import {
  activateKeepAwake,
  deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useAppContext, actions} from '../contexts/AppContext';
import {padStart} from 'lodash';
import Video from 'react-native-video';
import {Verse} from '../utils/interfaces';
import {styles} from '../utils/theme';

const AnthemScreen: React.FC = ({route}: any) => {
  const {id, title, verses, author} = route.params;
  const {
    state: {showSearch},
    dispatch,
  } = useAppContext();
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    dispatch(actions.scrollRef(scrollRef));
  }, [dispatch]);

  useEffect(() => {
    if (isFocused) {
      activateKeepAwake();
    } else {
      deactivateKeepAwake();
    }
  }, [isFocused]);

  function renderVerse(anthem: Verse) {
    return (
      <Text
        key={anthem.sequence}
        variant="bodyLarge"
        style={[
          styles.verse,
          anthem.sequence % 2 === 0 && styles.verseEven,
          anthem.chorus && styles.chorus,
        ]}>
        {anthem.lyrics}
      </Text>
    );
  }

  const anthemAudioUrl = `https://harpa.nyc3.digitaloceanspaces.com/${padStart(
    id,
    3,
    '0',
  )}.mp3`;

  return (
    <View style={styles.container}>
      <Appbar.Header>
        {navigation.canGoBack() && (
          <Appbar.BackAction
            onPress={() => {
              !showSearch && dispatch(actions.showSearch(true));
              navigation.canGoBack() && navigation.goBack();
            }}
          />
        )}
        <Appbar.Content title={`${id} - ${title}`} />
        {!showSearch && (
          <Appbar.Action
            icon="text-search"
            onPress={() => {
              dispatch(actions.showSearch(true));
            }}
          />
        )}
      </Appbar.Header>
      <Divider />
      <ScrollView
        ref={scrollRef}
        onScroll={e => {
          dispatch(actions.scroll(e.nativeEvent.contentOffset.y));
        }}>
        {verses.map(renderVerse)}
        <Divider />
        {author && (
          <Text variant="bodyLarge" style={styles.author}>
            {author}
          </Text>
        )}
      </ScrollView>
      <Video source={{uri: anthemAudioUrl}} controls paused />
    </View>
  );
};

const AnthemScreenMemo = React.memo(AnthemScreen);

export default AnthemScreenMemo;
