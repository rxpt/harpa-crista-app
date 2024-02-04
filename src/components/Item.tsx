import React, {memo} from 'react';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {Avatar, Chip, Text} from 'react-native-paper';
import styles from '../utils/styles';

interface Props {
  screen: string;
  params: any;
}

const anthemNumber = (number: number) => (
  <Avatar.Text
    size={24}
    label={number?.toString()}
    theme={{colors: {primary: 'white'}}}
  />
);

const Item: React.FC<Props> = ({screen, params}) => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <Chip
      avatar={anthemNumber(params?.id)}
      mode="outlined"
      style={styles.item}
      onPress={() => {
        navigation.navigate<any>(screen, params);
      }}>
      <Text style={[styles.title, styles.bold]}>{params?.title}</Text>
    </Chip>
  );
};

export default memo(Item);
