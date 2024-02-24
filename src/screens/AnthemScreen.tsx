import React from 'react';
import {View} from 'react-native';
import {
  activateKeepAwake,
  deactivateKeepAwake,
} from '@sayem314/react-native-keep-awake';
import HeaderBar from '../components/HeaderBar';
import Anthem from '../components/Anthem';
import Modals from '../components/Modals';
import {flex} from '../utils/styles';

const AnthemScreen: React.FC = () => {
  React.useLayoutEffect(() => {
    activateKeepAwake();

    return () => {
      deactivateKeepAwake();
    };
  }, []);

  return (
    <View style={flex.flex1}>
      <HeaderBar />
      <Anthem />
      <Modals />
    </View>
  );
};

export default React.memo(AnthemScreen);
