import React from 'react';
import BottomSheet from '../BottomSheetModal';
import {BottomSheetScrollView, TouchableOpacity} from '@gorhom/bottom-sheet';
import {Appbar, Divider, Text} from 'react-native-paper';
import {useAppContext} from '../../providers/AppProvider';
import {styles} from '../../utils/theme';
import {getAnthem, getIndexes} from '../../utils';
import {View} from 'react-native';

const IndexesModal = () => {
  const {dispatch} = useAppContext();

  return (
    <BottomSheet name="indexes">
      <BottomSheetScrollView>
        <Appbar.Header mode="center-aligned">
          <Appbar.Content title="Índice de Assuntos" />
        </Appbar.Header>
        <Divider />
        {getIndexes().map(item => {
          return (
            <View key={item._id.$oid}>
              <Text variant="titleMedium" style={styles.padding}>
                {item.title}
              </Text>
              <Divider />
              <View
                style={[
                  styles.flexRow,
                  styles.padding,
                  styles.wrap,
                  styles.gap,
                ]}>
                {item.data.map((number: number, index: number) => {
                  return (
                    <View key={index}>
                      <TouchableOpacity
                        style={styles.anthemButton}
                        onPress={() => {
                          dispatch({
                            type: 'SET_CURRENT_ANTHEM',
                            payload: getAnthem(number),
                          });
                          dispatch({type: 'SET_CURRENT_MODAL', payload: null});
                        }}>
                        <Text variant="bodySmall">{number}</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </View>
              <Divider />
            </View>
          );
        })}
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default IndexesModal;
