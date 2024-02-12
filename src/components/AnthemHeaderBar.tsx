import React from 'react';
import {View} from 'react-native';
import {Surface, IconButton} from 'react-native-paper';
import {useAppContext} from '../providers/AppProvider';
import {styles} from '../utils/theme';

const AnthemHeaderBar = () => {
  const {state, dispatch} = useAppContext();

  if (!state.currentAnthem) {
    return null;
  }

  const MAX_FONT_SIZE = state.maxFontSize;
  const MIN_FONT_SIZE = state.minFontSize;

  const changeFontSize = (fontSize: number) => {
    dispatch({type: 'SET_FONT_SIZE', payload: fontSize});
  };

  return (
    <Surface elevation={2}>
      <View
        style={[
          styles.paddingHeader,
          styles.container,
          styles.flexRow,
          styles.alignCenter,
          styles.spaceBetween,
        ]}>
        <View style={[styles.flexRow, styles.alignCenter]}>
          <IconButton
            icon="format-annotation-minus"
            onPress={() => changeFontSize(state.fontSize - 1)}
            disabled={state.fontSize <= MIN_FONT_SIZE}
          />
          <IconButton
            icon="format-annotation-plus"
            onPress={() => changeFontSize(state.fontSize + 1)}
            disabled={state.fontSize >= MAX_FONT_SIZE}
          />
        </View>
        <View style={styles.flexRow}>
          <IconButton
            selected
            mode="contained"
            icon="magnify"
            onPress={() => {
              dispatch({type: 'SET_CURRENT_MODAL', payload: 'anthems'});
            }}
            animated
          />
        </View>
      </View>
    </Surface>
  );
};

export default AnthemHeaderBar;
