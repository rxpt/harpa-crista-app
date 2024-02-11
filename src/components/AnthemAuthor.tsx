import React from 'react';
import {View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {useAppContext} from '../providers/AppProvider';
import {styles} from '../utils/theme';

const AnthemAuthor = () => {
  const {state} = useAppContext();

  return (
    <View
      style={[
        styles.padding,
        styles.flexRow,
        styles.alignCenter,
        styles.justifyCenter,
        styles.wrap,
      ]}>
      <View>
        <Divider />
        <Text variant="bodySmall" style={styles.author}>
          {state.currentAnthem?.author || 'Autor desconhecido'}
        </Text>
      </View>
    </View>
  );
};

export default AnthemAuthor;
