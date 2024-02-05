import React, {useEffect, useRef, useMemo, useState, useCallback} from 'react';
import {View, ScrollView} from 'react-native';
import {Text, Appbar, Divider} from 'react-native-paper';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {
  activateKeepAwake,
  deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {padStart} from 'lodash';
import Video from 'react-native-video';
import {Verse} from '../utils/interfaces';
import {colors, styles} from '../utils/theme';

const AnthemScreen: React.FC = ({route}: any) => {
  const {id, title, verses, author} = route.params;
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [bottomSheetIsVisible, setBottomSheetIsVisible] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '25%'], []);

  useEffect(() => {
    if (isFocused) {
      activateKeepAwake();
    } else {
      deactivateKeepAwake();
    }
  }, [isFocused]);

  /* callbacks */
  const handlePresentModalPress = useCallback(() => {
    bottomSheetIsVisible
      ? (bottomSheetModalRef.current as any)?.dismiss()
      : (bottomSheetModalRef.current as any)?.present();
  }, [bottomSheetIsVisible]);

  const handleSheetChanges = useCallback((index: number) => {
    setBottomSheetIsVisible(index > 0);
  }, []);

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
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Appbar.Header>
          {navigation.canGoBack() && (
            <Appbar.BackAction
              onPress={() => navigation.canGoBack() && navigation.goBack()}
            />
          )}
          <Appbar.Content title={`${id} - ${title}`} />
          <Appbar.Action icon="play" onPress={handlePresentModalPress} />
        </Appbar.Header>
        <Divider />
        <ScrollView>
          {verses.map(renderVerse)}
          <Divider />
          {author && (
            <Text variant="bodyLarge" style={styles.author}>
              {author}
            </Text>
          )}
        </ScrollView>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backgroundStyle={[styles.primaryContainer, styles.boxShadow]}
          handleIndicatorStyle={{backgroundColor: colors.secondary}}
          style={styles.content}>
          <Video source={{uri: anthemAudioUrl}} controls />
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const AnthemScreenMemo = React.memo(AnthemScreen);

export default AnthemScreenMemo;
