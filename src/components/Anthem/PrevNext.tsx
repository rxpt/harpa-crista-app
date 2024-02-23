import React from 'react';
import {View, StyleSheet} from 'react-native';
import Button from '../Button';
import {getAnthem, firstAndLastAnthemIds} from '../../utils';
import {useAppContext} from '../../providers/AppProvider';
import {theme} from '../../utils/theme';

const AnthemPrevNext = () => {
  const {
    state: {currentAnthem},
    dispatch,
  } = useAppContext();

  const {first, last} = firstAndLastAnthemIds();

  const styles = StyleSheet.create({
    buttonNextPrev: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      elevation: 4,
      backgroundColor: theme.colors.secondaryContainer,
      color: theme.colors.secondary,
      position: 'absolute',
      bottom: 30,
    },
    rightArrow: {
      right: 10,
    },
    leftArrow: {
      left: 10,
    },
  });

  const ICON_SIZE = 24;

  return (
    <View>
      <Button
        style={[styles.buttonNextPrev, styles.leftArrow]}
        disabled={currentAnthem.number === first}
        onPress={() =>
          dispatch({
            type: 'SET_CURRENT_ANTHEM',
            payload: getAnthem(currentAnthem.number - 1),
          })
        }
        icon="arrow-left"
        iconSize={ICON_SIZE}
      />
      <Button
        style={[styles.buttonNextPrev, styles.rightArrow]}
        disabled={currentAnthem.number === last}
        onPress={() =>
          dispatch({
            type: 'SET_CURRENT_ANTHEM',
            payload: getAnthem(currentAnthem.number + 1),
          })
        }
        icon="arrow-right"
        iconSize={ICON_SIZE}
      />
    </View>
  );
};

export default AnthemPrevNext;
