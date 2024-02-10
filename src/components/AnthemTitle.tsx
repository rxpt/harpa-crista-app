import React from 'react';
import {View} from 'react-native';
import {Divider, IconButton, Text} from 'react-native-paper';
import {useAppContext} from '../providers/AppProvider';
import {styles} from '../utils/theme';

const AnthemTitle = () => {
  const {state, dispatch} = useAppContext();
  const IS_FAVORITE = state.favorites.includes(state.currentAnthem?.id);

  return (
    <View>
      <Divider />
      <View
        style={[
          styles.padding,
          styles.flexRow,
          styles.alignCenter,
          styles.spaceBetween,
        ]}>
        <Text variant="headlineSmall" numberOfLines={1}>
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
    </View>
  );
};

export default AnthemTitle;
