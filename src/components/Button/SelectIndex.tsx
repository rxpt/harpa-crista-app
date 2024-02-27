import React from 'react';
import {TouchableOpacity} from '@gorhom/bottom-sheet';
import {useNavigationHooks} from '../../store/hooks';
import Text from '../Text';
import {flex, padding} from '../../utils/styles';
import {StyleProp, ViewStyle} from 'react-native';

interface ButtonSelectIndexProps {
  title?: string;
  data: number[];
  style?: StyleProp<ViewStyle>;
}

const ButtonSelectIndex = ({title, data, style}: ButtonSelectIndexProps) => {
  const {setModalParams} = useNavigationHooks();
  return (
    <TouchableOpacity
      style={[padding(10), flex.flexRow, flex.alignCenter, style]}
      onPress={() => {
        setModalParams({title, data});
      }}>
      <Text style={flex.flex1}>-</Text>
      {title && <Text style={flex.flex8}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default ButtonSelectIndex;
