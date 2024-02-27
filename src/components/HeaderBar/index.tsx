import React from 'react';
import {View} from 'react-native';
import Button from '../Button';
import {theme, flex, styles} from '../../utils/styles';
import {
  useAnthemHooks,
  useConfigHooks,
  useNavigationHooks,
} from '../../store/hooks';

const HeaderBar = () => {
  const anthemHooks = useAnthemHooks();
  const configHooks = useConfigHooks();
  const {openModal, isModalOpen} = useNavigationHooks();

  const currentAnthem = anthemHooks.getCurrent();
  const {
    min: MIN_FONT_SIZE,
    max: MAX_FONT_SIZE,
    current: fontSize,
  } = configHooks.getFontSize();

  if (!currentAnthem) {
    return null;
  }

  const ICON_SIZE = 32;
  const ICON_COLOR = theme.text;

  const IS_FAVORITE = anthemHooks.currentIsFavorite();
  const IS_FAVORITE_ICON = IS_FAVORITE ? 'heart' : 'heart-outline';
  const IS_FAVORITE_COLOR = IS_FAVORITE ? 'red' : ICON_COLOR;

  return (
    <View style={styles.app.header}>
      <View style={[flex.flexRow, flex.alignCenter]}>
        <Button
          onPress={() => openModal('menu')}
          icon="menu"
          iconColor={ICON_COLOR}
          iconSize={ICON_SIZE}
          disabled={isModalOpen('menu')}
          style={styles.app.headerButton}
        />
        <Button
          onPress={() => configHooks.setFontSize(fontSize - 1)}
          disabled={fontSize <= MIN_FONT_SIZE}
          icon="format-annotation-minus"
          iconColor={ICON_COLOR}
          iconSize={ICON_SIZE}
          style={styles.app.headerButton}
        />
        <Button
          onPress={() => configHooks.setFontSize(fontSize + 1)}
          disabled={fontSize >= MAX_FONT_SIZE}
          icon="format-annotation-plus"
          iconColor={ICON_COLOR}
          iconSize={ICON_SIZE}
          style={styles.app.headerButton}
        />
      </View>
      <View style={[flex.flexRow, flex.alignCenter]}>
        <Button
          onPress={() => anthemHooks.toggleFavorite()}
          icon={IS_FAVORITE_ICON}
          iconColor={IS_FAVORITE_COLOR}
          iconSize={ICON_SIZE}
          style={styles.app.headerButton}
        />
        <Button
          onPress={() => openModal('anthems')}
          icon="magnify"
          iconColor={ICON_COLOR}
          iconSize={ICON_SIZE}
          disabled={isModalOpen('anthems')}
          style={styles.app.headerButton}
        />
      </View>
    </View>
  );
};

export default HeaderBar;
