import React from 'react';
import {Dimensions} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {firstAndLastAnthemIds, getAnthem} from '../../utils';
import {useAppContext} from '../../providers/AppProvider';
import {flex} from '../../utils/styles';

const GestureHandler = ({children}: React.PropsWithChildren) => {
  const {
    state: {currentAnthem, fontSize, minFontSize, maxFontSize},
    dispatch,
  } = useAppContext();
  const currentAnthemId = currentAnthem?.number;
  const {first, last} = firstAndLastAnthemIds();
  const isFirst = currentAnthemId === first;
  const isLast = currentAnthemId === last;

  const windowWidth = Dimensions.get('window').width;
  const opacity = useSharedValue(1);
  const translationX = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translationX.value}],
      opacity: opacity.value,
    };
  });

  const setFontSize = React.useCallback(
    (newFontSize: number) => {
      dispatch({
        type: 'SET_FONT_SIZE',
        payload: newFontSize,
      });
    },
    [dispatch],
  );

  const isFirstOrLast = (pX: number) => {
    return (isFirst && pX > 0) || (isLast && pX < 0);
  };

  const pan = Gesture.Pan()
    .activeOffsetX([-20, 20])
    .runOnJS(true)
    .onUpdate(event => {
      if (isFirstOrLast(event.translationX)) {
        return;
      }

      translationX.value = withTiming(event.translationX);
      opacity.value = withTiming(
        1 - Math.abs(event.translationX / windowWidth),
      );
    })
    .onEnd(event => {
      if (isFirstOrLast(event.translationX)) {
        return;
      }

      const left = event.translationX >= Math.min(windowWidth / 2, 100);
      const right = event.translationX <= -Math.min(windowWidth / 2, 100);

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

      translationX.value = left ? -windowWidth : right ? windowWidth : 0;
      translationX.value = withSpring(0);
      opacity.value = withSpring(1);
    });

  const pinch = Gesture.Pinch()
    .runOnJS(true)
    .onUpdate(event => {
      const isZoomIn = event.scale > 1;

      const newFontSize = Math.max(
        minFontSize,
        Math.min(maxFontSize, isZoomIn ? fontSize + 1 : fontSize - 1),
      );

      setFontSize(newFontSize);
    });

  const gestureRace = Gesture.Race(pan, pinch);

  return (
    <GestureDetector gesture={gestureRace}>
      <Animated.View style={[animatedStyle, flex.flex1]}>
        {children}
      </Animated.View>
    </GestureDetector>
  );
};

export default GestureHandler;
