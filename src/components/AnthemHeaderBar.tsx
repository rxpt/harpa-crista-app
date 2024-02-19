import React from 'react';
import {View, ToastAndroid} from 'react-native';
import {Surface} from 'react-native-paper';
import Button from './Button';
import {styles} from '../utils/theme';
import {useAppContext} from '../providers/AppProvider';

const AnthemHeaderBar = () => {
  const {state, dispatch} = useAppContext();

  if (!state.currentAnthem) {
    return null;
  }

  const MAX_FONT_SIZE = state.maxFontSize;
  const MIN_FONT_SIZE = state.minFontSize;

  const ICON_SIZE = 24;

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
          <Button
            style={styles.iconButton}
            onPress={() =>
              dispatch({type: 'SET_CURRENT_MODAL', payload: 'mainMenu'})
            }
            icon="menu"
            iconSize={ICON_SIZE}
            disabled={state.currentModal === 'mainMenu'}
          />
          <Button
            onPress={() => changeFontSize(state.fontSize - 1)}
            disabled={state.fontSize <= MIN_FONT_SIZE}
            icon="format-annotation-minus"
            iconSize={ICON_SIZE}
          />
          <Button
            onPress={() => changeFontSize(state.fontSize + 1)}
            disabled={state.fontSize >= MAX_FONT_SIZE}
            icon="format-annotation-plus"
            iconSize={ICON_SIZE}
          />
        </View>
        <View style={[styles.flexRow, styles.menuGap]}>
          <Button
            onPress={() => toggleFavorite()}
            icon={IS_FAVORITE_ICON}
            iconSize={ICON_SIZE}
          />
          <Button
            onPress={() =>
              dispatch({type: 'SET_CURRENT_MODAL', payload: 'anthems'})
            }
            icon="magnify"
            iconSize={ICON_SIZE}
            disabled={state.currentModal === 'anthems'}
          />
        </View>
      </View>
    </Surface>
  );
};

export default AnthemHeaderBar;
