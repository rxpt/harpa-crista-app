import React from 'react';
import {View} from 'react-native';
import {
  activateKeepAwake,
  deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import {useAppContext} from '../providers/AppProvider';
import HeaderBar from '../components/HeaderBar';
import Anthem from '../components/Anthem';
import Modals from '../components/Modals';
import {styles} from '../utils/theme';
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
        payload: newFontSize,
      });
    },
    [dispatch],
  );

  const pan = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .runOnJS(true)
    .onEnd(event => {
      const currentAnthemId = currentAnthem?.number;
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
      const isZoomIn = scale > 1;
      //const isZoomOut = scale < 1;

      const newFontSize = Math.max(
        minFontSize,
        Math.min(maxFontSize, isZoomIn ? fontSize + 1 : fontSize - 1),
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
      <HeaderBar />
      <GestureDetector gesture={gestureRace}>
        <Anthem />
      </GestureDetector>
      <Modals />
    </View>
  );
};

export default React.memo(AnthemScreen);
