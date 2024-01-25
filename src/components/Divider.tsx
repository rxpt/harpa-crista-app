import React from 'react';
import {View, StyleSheet, ColorValue} from 'react-native';
import {materialColors} from 'react-native-typography';

type DividerProps = {
  marginVertical?: number;
  marginHorizontal?: number;
  height?: number;
  color?: ColorValue;
};

const Divider = ({
  marginHorizontal,
  marginVertical = 10,
  height = StyleSheet.hairlineWidth,
  color = materialColors.blackTertiary,
}: DividerProps) => {
  const styles = StyleSheet.create({
    divider: {
      height,
      marginVertical,
      marginHorizontal,
      backgroundColor: color,
    },
  });

  return <View style={styles.divider} />;
};

export default Divider;
