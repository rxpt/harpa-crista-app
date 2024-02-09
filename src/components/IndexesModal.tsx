import React from 'react';
import BottomSheet from './BottomSheet';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {Appbar, Button, Divider, Text} from 'react-native-paper';
import {useAppContext} from '../providers/AppProvider';
import {styles, theme} from '../utils/theme';
import {getIndexes} from '../utils';

const IndexesModal = () => {
  const {dispatch} = useAppContext();

  return (
    <BottomSheet name="indexes">
      <Appbar.Header
        mode="center-aligned"
        style={{
          backgroundColor: theme.colors.onSecondary,
        }}>
        <Appbar.Content title="Índice de Assuntos" />
      </Appbar.Header>
      <Divider />
      <BottomSheetFlatList
        data={getIndexes()}
        initialNumToRender={5}
        contentContainerStyle={[styles.padding, styles.gap]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <Button
              mode="outlined"
              onPress={() => {
                dispatch({
                  type: 'SET_SEARCH_INDEX',
                  payload: item.anthems?.length > 0 ? index : -1,
                });
                dispatch({type: 'SET_CURRENT_MODAL', payload: 'anthems'});
              }}>
              <Text>{item.title}</Text>
            </Button>
          );
        }}
      />
    </BottomSheet>
  );
};

export default IndexesModal;
