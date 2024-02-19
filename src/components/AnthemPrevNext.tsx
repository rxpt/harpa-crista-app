import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import Button from './Button';
import {getAnthem, firstAndLastAnthemIds} from '../utils';
import {useAppContext} from '../providers/AppProvider';
import {theme} from '../utils/theme';

const AnthemPrevNext = () => {
  const {
    state: {currentAnthem},
    dispatch,
  } = useAppContext();

  const {first, last} = firstAndLastAnthemIds();
  const {height} = Dimensions.get('window');

  const styles = StyleSheet.create({
    buttonNextPrev: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      elevation: 5,
      backgroundColor: theme.colors.secondaryContainer,
      color: theme.colors.secondary,
      position: 'absolute',
      bottom: height / 2 - 25,
    },
    rightArrow: {
      right: -16,
    },
    leftArrow: {
      left: -16,
    },
  });

  const ICON_SIZE = 24;

  return (
    <View>
      <Button
        style={[styles.buttonNextPrev, styles.leftArrow]}
        disabled={currentAnthem.id === first}
        onPress={() =>
          dispatch({
            type: 'SET_CURRENT_ANTHEM',
            payload: getAnthem(currentAnthem.id - 1),
          })
        }
        icon="arrow-left"
        iconSize={ICON_SIZE}
      />
      <Button
        style={[styles.buttonNextPrev, styles.rightArrow]}
        disabled={currentAnthem.id === last}
        onPress={() =>
          dispatch({
            type: 'SET_CURRENT_ANTHEM',
            payload: getAnthem(currentAnthem.id + 1),
          })
        }
        icon="arrow-right"
        iconSize={ICON_SIZE}
      />
    </View>
  );
};

export default AnthemPrevNext;
