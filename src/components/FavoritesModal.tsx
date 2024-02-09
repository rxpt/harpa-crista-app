import React from 'react';
import BottomSheet from './BottomSheet';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {Appbar, Button, Divider, Text} from 'react-native-paper';
import {styles, theme} from '../utils/theme';
import {useAppContext} from '../providers/AppProvider';
import {getAnthem} from '../utils';

const FavoritesModal = () => {
  const {state, dispatch} = useAppContext();
  const getFavorites = () =>
    state.favorites.map(favorite => getAnthem(favorite));

  return (
    <BottomSheet name="favorites">
      <Appbar.Header
        mode="center-aligned"
        style={{
          backgroundColor: theme.colors.onSecondary,
        }}>
        <Appbar.Content title="Favoritos" />
      </Appbar.Header>
      <Divider />
      <BottomSheetFlatList
        data={getFavorites()}
        ListEmptyComponent={<Text>Adicione seus hinos favoritos</Text>}
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

export default FavoritesModal;
