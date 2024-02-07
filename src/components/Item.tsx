import React, {memo} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {Divider, Text} from 'react-native-paper';
import {useAppContext, actions} from '../contexts/AppContext';
import {styles} from '../utils/theme';

interface Props {
  screen: string;
  params: any;
}

const Item: React.FC<Props> = ({screen, params}) => {
  const {
    state: {showSearch},
    dispatch,
  } = useAppContext();
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <TouchableOpacity
      onPress={() => {
        showSearch && dispatch(actions.showSearch(false));
        navigation.navigate<any>(screen, params);
      }}>
      <View style={[styles.flexRow, styles.alignCenter]}>
        {params?.id && (
          <View style={styles.number}>
            <Text style={styles.centered}>{params?.id}</Text>
          </View>
        )}
        <Text variant="titleMedium" style={styles.title}>
          {params?.title}
        </Text>
      </View>
      <Divider />
    </TouchableOpacity>
  );
};

export default memo(Item);
