import React from 'react';
import BottomSheet from './BottomSheet';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {Appbar, Button, Divider, Text} from 'react-native-paper';
import {styles, theme} from '../utils/theme';
import {useAppContext} from '../providers/AppProvider';
import {getAnthem} from '../utils';

const HistoryModal = () => {
  const {state, dispatch} = useAppContext();
  const getHistory = () => state.history.map(history => getAnthem(history));

  return (
    <BottomSheet name="history">
      <Appbar.Header
        mode="center-aligned"
        style={{
          backgroundColor: theme.colors.onSecondary,
        }}>
        <Appbar.Content title="Histórico (últimos 10)" />
      </Appbar.Header>
      <Divider />
      <BottomSheetFlatList
        data={getHistory()}
        initialNumToRender={5}
        contentContainerStyle={[styles.padding, styles.gap]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <Button
              mode="outlined"
              onPress={() => {
                dispatch({type: 'SET_CURRENT_ANTHEM', payload: item});
                dispatch({type: 'SET_CURRENT_MODAL', payload: null});
              }}>
              <Text>
                {item.id}. {item.title}
              </Text>
            </Button>
          );
        }}
      />
    </BottomSheet>
  );
};

export default HistoryModal;
