import React, {memo} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Link} from '@react-navigation/native';
import {materialColors, robotoWeights, human} from 'react-native-typography';
import Divider from './Divider';

interface Props {
  id: number;
  title: string;
}

const Item: React.FC<Props> = ({id, title}) => {
  return (
    <View style={styles.item}>
      <Link
        to={{
          screen: 'anthem',
          params: {
            id: id,
            title: title,
          },
        }}>
        <Text style={[styles.content, styles.bold]}>
          {id} - {title.toUpperCase()}
        </Text>
      </Link>
      <Divider height={2} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  content: {
    ...human.title3Object,
    ...robotoWeights.light,
    color: materialColors.whitePrimary,
  },
  bold: {
    ...robotoWeights.bold,
  },
});

export default memo(Item);
