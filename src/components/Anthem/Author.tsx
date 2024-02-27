import React from 'react';
import {View, Text} from 'react-native';
import {padding, flex, styles} from '../../utils/styles';

const AnthemAuthor = ({author}: {author?: string}) => {
  return (
    <View
      style={[
        padding(10),
        flex.flexRow,
        flex.alignCenter,
        flex.justifyCenter,
        flex.flexWrap,
      ]}>
      <Text style={styles.anthem.author}>{author || 'Autor desconhecido'}</Text>
    </View>
  );
};

export default AnthemAuthor;
