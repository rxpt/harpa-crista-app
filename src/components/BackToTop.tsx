import React from 'react';
import {Dimensions} from 'react-native';
import {useAppContext} from '../contexts/AppContext';
import {AnimatedFAB} from 'react-native-paper';
import {styles} from '../utils/theme';

export const BackToTop = () => {
  const {
    state: {scrollY, scrollRef},
  } = useAppContext();
  const {height} = Dimensions.get('window');

  const backToTop = () => {
    if ((scrollRef as any).current as any) {
      ((scrollRef as any).current as any)?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  return (
    <AnimatedFAB
      icon="arrow-up"
      label="Voltar"
      extended={false}
      onPress={backToTop}
      visible={scrollY > height / 2}
      style={[styles.absolute, styles.end, styles.bottom, styles.margin]}
    />
  );
};
