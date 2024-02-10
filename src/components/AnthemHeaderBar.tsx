import React from 'react';
import {View} from 'react-native';
import {Divider, IconButton} from 'react-native-paper';
import {useAppContext} from '../providers/AppProvider';
import {styles} from '../utils/theme';

const AnthemHeaderBar = () => {
  const {state, dispatch} = useAppContext();

  const MAX_FONT_SIZE = state.maxFontSize;
  const MIN_FONT_SIZE = state.minFontSize;

  const changeFontSize = (fontSize: number) => {
    dispatch({type: 'SET_FONT_SIZE', payload: fontSize});
  };

  return (
    <View style={[styles.paddingHeader, styles.primaryContainer]}>
      <View style={[styles.flexRow, styles.alignCenter, styles.spaceBetween]}>
        <View style={[styles.flexRow, styles.alignEnd]}>
          <IconButton
            icon="format-annotation-minus"
            onPress={() => changeFontSize(state.fontSize - 1)}
            disabled={state.fontSize <= MIN_FONT_SIZE}
            size={18}
          />
          <IconButton
            icon="format-annotation-plus"
            onPress={() => changeFontSize(state.fontSize + 1)}
            disabled={state.fontSize >= MAX_FONT_SIZE}
            size={20}
          />
        </View>
        <View style={styles.flexRow}>
          <IconButton
            selected
            mode="contained"
            icon="magnify"
            onPress={() => {
              dispatch({type: 'SET_SEARCH_INDEX', payload: -1});
              dispatch({type: 'SET_CURRENT_MODAL', payload: 'anthems'});
            }}
            animated
          />
        </View>
      </View>
      <Divider />
    </View>
  );
};

export default AnthemHeaderBar;
