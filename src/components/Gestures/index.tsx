import React from 'react';
import {useWindowDimensions} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {flex} from '../../utils/styles';
import {useAnthemHooks, useConfigHooks} from '../../store/hooks';

const GestureHandler = ({children}: React.PropsWithChildren) => {
  const windowWidth = useWindowDimensions().width;
  const configHooks = useConfigHooks();
  const anthemHooks = useAnthemHooks();

  const {
    current: fontSize,
    min: MIN_FONT_SIZE,
    max: MAX_FONT_SIZE,
  } = configHooks.getFontSize();

  const isFirst = anthemHooks.currentIsFirst();
  const isLast = anthemHooks.currentIsLast();

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
      configHooks.setFontSize(newFontSize);
    },
    [configHooks],
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
        anthemHooks.previous();
      } else if (right && !isLast) {
        anthemHooks.next();
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
        MIN_FONT_SIZE,
        Math.min(MAX_FONT_SIZE, isZoomIn ? fontSize + 1 : fontSize - 1),
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
