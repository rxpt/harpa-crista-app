import React from 'react';
import {View} from 'react-native';
import BottomSheet from './BottomSheet';
import {BottomSheetFlatList, TouchableOpacity} from '@gorhom/bottom-sheet';
import {Appbar, Divider, Text} from 'react-native-paper';
import {styles} from '../../utils/theme';
import {useAppContext} from '../../providers/AppProvider';
import {filterFavorites} from '../../utils';

const FavoritesModal = () => {
  const {state, dispatch} = useAppContext();

  return (
    <BottomSheet name="favorites">
      <Appbar.Header mode="center-aligned">
        <Appbar.Content title="Favoritos" />
      </Appbar.Header>
      <Divider />
      <BottomSheetFlatList
        data={filterFavorites(state.favorites)}
        ListEmptyComponent={<Text>Adicione seus hinos favoritos</Text>}
        initialNumToRender={5}
        contentContainerStyle={[styles.padding, styles.gap]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  dispatch({type: 'SET_CURRENT_ANTHEM', payload: item});
                  dispatch({type: 'SET_CURRENT_MODAL', payload: null});
                }}>
                <View style={[styles.flexRow, styles.alignCenter]}>
                  {item.id && (
                    <View style={styles.number}>
                      <Text style={styles.centered}>{item.id}</Text>
                    </View>
                  )}
                  <Text variant="titleMedium" style={styles.title}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
              <Divider />
            </View>
          );
        }}
      />
    </BottomSheet>
  );
};

export default FavoritesModal;
