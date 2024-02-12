import React from 'react';
import {View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';
import {useAppContext} from '../providers/AppProvider';
import {styles} from '../utils/theme';

const AnthemTitle = () => {
  const {state, dispatch} = useAppContext();

  if (!state.currentAnthem) {
    return null;
  }

  const IS_FAVORITE = state.favorites.includes(state.currentAnthem?.id);

  return (
    <View
      style={[
        styles.padding,
        styles.flexRow,
        styles.alignCenter,
        styles.spaceBetween,
        styles.wrap,
      ]}>
      <Text style={styles.anthemTitle} numberOfLines={1} ellipsizeMode="tail">
        {state.currentAnthem?.id}. {state.currentAnthem?.title}
      </Text>
      <IconButton
        icon={IS_FAVORITE ? 'heart' : 'heart-outline'}
        onPress={() => {
          dispatch({
            type: 'TOGGLE_FAVORITE',
            payload: state.currentAnthem?.id,
          });
        }}
        iconColor={IS_FAVORITE ? 'red' : undefined}
        animated
      />
    </View>
  );
};

export default AnthemTitle;
