import React from 'react';
import {Text, View} from 'react-native';
import BottomSheet from '../BottomSheetModal';
import {BottomSheetFlatList, TouchableOpacity} from '@gorhom/bottom-sheet';
import {useAppContext} from '../../providers/AppProvider';
import {flex, padding, gap, styles} from '../../utils/styles';
import {filterHistory} from '../../utils';

const HistoryModal = () => {
  const {
    state: {history},
    dispatch,
  } = useAppContext();

  return (
    <BottomSheet name="history">
      <BottomSheetFlatList
        ListHeaderComponent={
          <View>
            <Text style={styles.app.menuTitle}>Histórico</Text>
            <Text style={styles.app.menuSubtitle}>Últimos hinos acessados</Text>
          </View>
        }
        data={filterHistory(history)}
        contentContainerStyle={[padding(10), gap(5)]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={[flex.flexRow, flex.alignCenter]}
              onPress={() => {
                dispatch({type: 'SET_CURRENT_ANTHEM', payload: item});
                dispatch({type: 'SET_CURRENT_MODAL', payload: null});
              }}>
              {item.number && <Text style={flex.flex1}>{item.number}</Text>}
              <Text style={flex.flex12}>{item.title}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </BottomSheet>
  );
};

export default HistoryModal;
