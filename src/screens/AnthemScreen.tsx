import React from 'react';
import {View} from 'react-native';
import {
  activateKeepAwake,
  deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';
import AnthemsModal from '../components/modals/AnthemsModal';
import IndexesModal from '../components/modals/IndexesModal';
import FavoritesModal from '../components/modals/FavoritesModal';
import HistoryModal from '../components/modals/HistoryModal';
import AnthemHeaderBar from '../components/AnthemHeaderBar';
import {useAppContext} from '../providers/AppProvider';
import {styles} from '../utils/theme';
import AnthemPrevNext from '../components/AnthemPrevNext';
import MenuModal from '../components/modals/MenuModal';
import AnthemLyrics from '../components/AnthemLyrics';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {getAnthem, firstAndLastAnthemIds} from '../utils';

const AnthemScreen: React.FC = () => {
  const {
    state: {currentAnthem, fontSize, minFontSize, maxFontSize},
    dispatch,
  } = useAppContext();

  const setFontSize = React.useCallback(
    (newFontSize: number) => {
      dispatch({
        type: 'SET_FONT_SIZE',
        payload: Math.round(newFontSize),
      });
    },
    [dispatch],
  );

  const pan = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .runOnJS(true)
    .onEnd(event => {
      const currentAnthemId = currentAnthem?.id;
      const {first, last} = firstAndLastAnthemIds();
      const left = event.translationX >= 100;
      const right = event.translationX <= -100;
      const isFirst = currentAnthemId === first;
      const isLast = currentAnthemId === last;

      if (left && !isFirst) {
        dispatch({
          type: 'SET_CURRENT_ANTHEM',
          payload: getAnthem(currentAnthemId - 1),
        });
      } else if (right && !isLast) {
        dispatch({
          type: 'SET_CURRENT_ANTHEM',
          payload: getAnthem(currentAnthemId + 1),
        });
      }
    });

  const pinch = Gesture.Pinch()
    .runOnJS(true)
    .onUpdate(event => {
      const scale = event.scale;
      const newFontSize = Math.max(
        minFontSize,
        Math.min(maxFontSize, fontSize * scale),
      );

      setFontSize(newFontSize);
    });

  const gestureRace = Gesture.Race(pan, pinch);

  React.useLayoutEffect(() => {
    activateKeepAwake();

    return () => {
      deactivateKeepAwake();
    };
  }, []);

  return (
    <View style={styles.container}>
      <AnthemHeaderBar />
      <GestureDetector gesture={gestureRace}>
        <AnthemLyrics />
      </GestureDetector>
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
