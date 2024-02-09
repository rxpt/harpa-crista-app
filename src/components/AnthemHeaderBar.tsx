import React from 'react';
import {View} from 'react-native';
import {Appbar, Divider} from 'react-native-paper';
import {useAppContext} from '../providers/AppProvider';

type AnthemHeaderBarProps = {
  title: string;
  buttons?: {
    icon: string;
    label?: string;
    action: () => void;
    disabled?: boolean;
    hidden?: boolean;
  }[];
};

const AnthemHeaderBar = ({title, buttons}: AnthemHeaderBarProps) => {
  const {state, dispatch} = useAppContext();

  const MAX_FONT_SIZE = state.maxFontSize;
  const MIN_FONT_SIZE = state.minFontSize;

  const changeFontSize = (fontSize: number) => {
    if (fontSize > MAX_FONT_SIZE || fontSize < MIN_FONT_SIZE) {
      return;
    }

    dispatch({type: 'SET_FONT_SIZE', payload: fontSize});
  };

  const increaseFontSize = () => {
    changeFontSize(state.fontSize + 1);
  };

  const decreaseFontSize = () => {
    changeFontSize(state.fontSize - 1);
  };

  return (
    <View>
      <Appbar.Header mode="medium">
        <Appbar.Content title={title} />
        {/* music music-note autorenew backup-restore bookmark-plus bookmark-remove format-annotation-minus format-annotation-plus heart heart-outline history  */}
        <Appbar.Action
          icon="format-annotation-minus"
          onPress={decreaseFontSize}
          disabled={state.fontSize <= MIN_FONT_SIZE}
        />
        <Appbar.Action
          icon="format-annotation-plus"
          onPress={increaseFontSize}
          disabled={state.fontSize >= MAX_FONT_SIZE}
        />
        {buttons &&
          buttons.map(
            (button, index) =>
              !button.hidden && (
                <Appbar.Action
                  key={index}
                  icon={button.icon}
                  onPress={button.action}
                  disabled={button.disabled}
                />
              ),
          )}
      </Appbar.Header>
      <Divider />
    </View>
  );
};

export default AnthemHeaderBar;
