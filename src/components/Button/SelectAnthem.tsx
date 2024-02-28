import React from 'react';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {useNavigationHooks, useAnthemHooks} from '../../store/hooks';
import Text from '../Text';
import {flex, padding} from '../../utils/styles';
import {StyleProp, ViewStyle} from 'react-native';
import {useBottomSheetModal} from '@gorhom/bottom-sheet';

interface ButtonSelectAnthemProps {
  title?: string;
  number: number;
  style?: StyleProp<ViewStyle>;
}

const ButtonSelectAnthem = ({
  title,
  number,
  style,
}: ButtonSelectAnthemProps) => {
  const {searchReset, currentScreen, navigateTo} = useNavigationHooks();
  const {dismissAll} = useBottomSheetModal();
  const {setCurrent} = useAnthemHooks();
  return (
    <TouchableOpacity
      style={[padding(10), flex.flexRow, flex.alignCenter, style]}
      onPress={() => {
        setCurrent(number);
        searchReset();
        if (currentScreen()?.name !== 'anthem') {
          return navigateTo('anthem');
        }
        dismissAll();
      }}>
      <Text style={flex.flex1}>{number}</Text>
      {title && <Text style={flex.flex8}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default ButtonSelectAnthem;
