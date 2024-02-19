import React from 'react';
import {View, TouchableHighlight} from 'react-native';
import Icon from './Icon';
import {getAnthem, firstAndLastAnthemIds} from '../utils';
import {useAppContext} from '../providers/AppProvider';
import {styles} from '../utils/theme';

const AnthemPrevNext = () => {
  const {
    state: {currentAnthem},
    dispatch,
  } = useAppContext();

  const {first, last} = firstAndLastAnthemIds();

  return (
    <View>
      <TouchableHighlight
        style={[
          styles.buttonNextPrev,
          styles.leftArrow,
          currentAnthem.id === first && styles.iconButtonDisabled,
        ]}
        disabled={currentAnthem.id === first}
        onPress={() =>
          dispatch({
            type: 'SET_CURRENT_ANTHEM',
            payload: getAnthem(currentAnthem.id - 1),
          })
        }>
        <Icon name="arrow-left" size={24} />
      </TouchableHighlight>
      <TouchableHighlight
        style={[
          styles.buttonNextPrev,
          styles.rightArrow,
          currentAnthem.id === last && styles.iconButtonDisabled,
        ]}
        disabled={currentAnthem.id === last}
        onPress={() =>
          dispatch({
            type: 'SET_CURRENT_ANTHEM',
            payload: getAnthem(currentAnthem.id + 1),
          })
        }>
        <Icon name="arrow-right" size={24} />
      </TouchableHighlight>
    </View>
  );
};

export default AnthemPrevNext;
