import React, {memo} from 'react';
import {Text} from 'react-native';
import {Link} from '@react-navigation/native';
import styles from '../utils/styles';

interface Props {
  screen: string;
  params: any;
}

const Item: React.FC<Props> = ({screen, params}) => {
  return (
    <Link
      style={styles.item}
      to={{
        screen: screen as never,
        params: params as never,
      }}>
      {params?.id && <Text style={styles.subtitle}>{params.id} </Text>}
      <Text style={[styles.title, styles.bold]}>
        {params?.title.toUpperCase()}
      </Text>
    </Link>
  );
};

export default memo(Item);
