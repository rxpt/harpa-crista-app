import React from 'react';
import {View, TouchableHighlight, ToastAndroid} from 'react-native';
import {Surface} from 'react-native-paper';
import Icon from './Icon';
import {styles} from '../utils/theme';
import {useAppContext} from '../providers/AppProvider';

const AnthemHeaderBar = () => {
  const {state, dispatch} = useAppContext();

  if (!state.currentAnthem) {
    return null;
  }

  const MAX_FONT_SIZE = state.maxFontSize;
  const MIN_FONT_SIZE = state.minFontSize;

  const IS_FAVORITE = state.favorites.includes(state.currentAnthem?.id);
  const IS_FAVORITE_ICON = IS_FAVORITE ? 'heart' : 'heart-outline';
  const toggleFavorite = () => {
    dispatch({
      type: 'TOGGLE_FAVORITE',
      payload: state.currentAnthem?.id,
    });
    ToastAndroid.show(
      IS_FAVORITE ? 'Removido dos favoritos' : 'Adicionado aos favoritos',
      ToastAndroid.SHORT,
    );
  };

  const changeFontSize = (fontSize: number) => {
    dispatch({type: 'SET_FONT_SIZE', payload: fontSize});
  };

  return (
    <Surface elevation={2}>
      <View
        style={[
          styles.paddingHeader,
          styles.flexRow,
          styles.alignCenter,
          styles.spaceBetween,
        ]}>
        <View style={[styles.flexRow, styles.alignCenter, styles.gap]}>
          <TouchableHighlight
            style={styles.iconButton}
            onPress={() =>
              dispatch({type: 'SET_CURRENT_MODAL', payload: 'mainMenu'})
            }>
            <Icon name="menu" size={24} />
          </TouchableHighlight>
          <TouchableHighlight
            style={[
              styles.iconButton,
              state.fontSize <= MIN_FONT_SIZE && styles.iconButtonDisabled,
            ]}
            onPress={() => changeFontSize(state.fontSize - 1)}
            disabled={state.fontSize <= MIN_FONT_SIZE}>
            <Icon name="format-annotation-minus" size={24} />
          </TouchableHighlight>
          <TouchableHighlight
            style={[
              styles.iconButton,
              state.fontSize >= MAX_FONT_SIZE && styles.iconButtonDisabled,
            ]}
            onPress={() => changeFontSize(state.fontSize + 1)}
            disabled={state.fontSize >= MAX_FONT_SIZE}>
            <Icon name="format-annotation-plus" size={24} />
          </TouchableHighlight>
        </View>
        <View style={[styles.flexRow, styles.menuGap]}>
          <TouchableHighlight
            style={styles.iconButton}
            onPress={() => toggleFavorite()}>
            <Icon name={IS_FAVORITE_ICON} size={24} />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.iconButton}
            onPress={() =>
              dispatch({type: 'SET_CURRENT_MODAL', payload: 'anthems'})
            }>
            <Icon name="magnify" size={24} />
          </TouchableHighlight>
        </View>
      </View>
    </Surface>
  );
};

export default AnthemHeaderBar;
