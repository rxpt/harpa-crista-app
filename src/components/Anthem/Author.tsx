import React from 'react';
import {View, Text} from 'react-native';
import {useAppContext} from '../../providers/AppProvider';
import {padding, flex, styles} from '../../utils/styles';

const AnthemAuthor = () => {
  const {
    state: {currentAnthem},
  } = useAppContext();

  if (!currentAnthem) {
    return null;
  }

  return (
    <View
      style={[
        padding(10),
        flex.flexRow,
        flex.alignCenter,
        flex.justifyCenter,
        flex.flexWrap,
      ]}>
      <Text style={styles.anthem.author}>
        {currentAnthem.author || 'Autor desconhecido'}
      </Text>
    </View>
  );
};

export default AnthemAuthor;
