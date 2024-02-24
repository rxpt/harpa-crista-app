import React from 'react';
import {View} from 'react-native';
import BottomSheet from '../BottomSheetModal';
import {BottomSheetFlatList, TouchableOpacity} from '@gorhom/bottom-sheet';
import {useAppContext} from '../../providers/AppProvider';
import Text from '../Text';
import {filterFavorites} from '../../utils';
import {padding, gap, flex, styles} from '../../utils/styles';

const FavoritesModal = () => {
  const {
    state: {favorites},
    dispatch,
  } = useAppContext();

  return (
    <BottomSheet name="favorites">
      <BottomSheetFlatList
        data={filterFavorites(favorites)}
        ListHeaderComponent={
          <View>
            <Text style={styles.app.menuTitle}>Favoritos</Text>
            <Text style={styles.app.menuSubtitle}>Hinos favoritos</Text>
          </View>
        }
        ListEmptyComponent={<Text>Adicione seus hinos favoritos</Text>}
        contentContainerStyle={[padding(20), gap(5)]}
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

export default FavoritesModal;
