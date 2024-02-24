import React from 'react';
import {View, ToastAndroid} from 'react-native';
import Button from '../Button';
import {useAppContext} from '../../providers/AppProvider';
import {flex, styles} from '../../utils/styles';
import {isFavorite} from '../../utils';
import {colors} from '../../utils/styles/colors';

const HeaderBar = () => {
  const {
    state: {
      fontSize,
      currentAnthem,
      maxFontSize,
      minFontSize,
      favorites,
      currentModal,
    },
    dispatch,
  } = useAppContext();

  if (!currentAnthem) {
    return null;
  }

  const MAX_FONT_SIZE = maxFontSize;
  const MIN_FONT_SIZE = minFontSize;

  const ICON_SIZE = 26;
  const ICON_COLOR = colors.white;

  const IS_FAVORITE = isFavorite(favorites, currentAnthem.number);
  const IS_FAVORITE_ICON = IS_FAVORITE ? 'heart' : 'heart-outline';
  const IS_FAVORITE_COLOR = IS_FAVORITE ? 'red' : ICON_COLOR;

  const toggleFavorite = () => {
    dispatch({
      type: 'TOGGLE_FAVORITE',
      payload: currentAnthem.number,
    });
    ToastAndroid.show(
      IS_FAVORITE ? 'Removido dos favoritos' : 'Adicionado aos favoritos',
      ToastAndroid.SHORT,
    );
  };

  const changeFontSize = (size: number) => {
    dispatch({type: 'SET_FONT_SIZE', payload: size});
  };

  return (
    <View style={styles.app.header}>
      <View style={[flex.flexRow, flex.alignCenter]}>
        <Button
          onPress={() =>
            dispatch({type: 'SET_CURRENT_MODAL', payload: 'mainMenu'})
          }
          icon="menu"
          iconColor={ICON_COLOR}
          iconSize={ICON_SIZE}
          disabled={currentModal === 'mainMenu'}
          style={styles.app.headerButton}
        />
        <Button
          onPress={() => changeFontSize(fontSize - 1)}
          disabled={fontSize <= MIN_FONT_SIZE}
          icon="format-annotation-minus"
          iconColor={ICON_COLOR}
          iconSize={ICON_SIZE}
          style={styles.app.headerButton}
        />
        <Button
          onPress={() => changeFontSize(fontSize + 1)}
          disabled={fontSize >= MAX_FONT_SIZE}
          icon="format-annotation-plus"
          iconColor={ICON_COLOR}
          iconSize={ICON_SIZE}
          style={styles.app.headerButton}
        />
      </View>
      <View style={[flex.flexRow, flex.alignCenter]}>
        <Button
          onPress={() => toggleFavorite()}
          icon={IS_FAVORITE_ICON}
          iconColor={IS_FAVORITE_COLOR}
          iconSize={ICON_SIZE}
          style={styles.app.headerButton}
        />
        <Button
          onPress={() =>
            dispatch({type: 'SET_CURRENT_MODAL', payload: 'anthems'})
          }
          icon="magnify"
          iconColor={ICON_COLOR}
          iconSize={ICON_SIZE}
          disabled={currentModal === 'anthems'}
          style={styles.app.headerButton}
        />
      </View>
    </View>
  );
};

export default HeaderBar;
