import React from 'react';
import BottomSheet from './BottomSheet';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {Divider, Searchbar, Text} from 'react-native-paper';
import {TouchableOpacity, View} from 'react-native';
import {useAppContext} from '../providers/AppProvider';
import {searchAnthems} from '../utils';
import {styles} from '../utils/theme';

const AnthemsModal = () => {
  const {state, dispatch} = useAppContext();
  const flatListRef = React.useRef(null);

  React.useEffect(() => {
    dispatch({
      type: 'SET_SEARCH_RESULTS',
      payload: searchAnthems(state.searchQuery, state.searchIndex),
    });
  }, [dispatch, state.searchIndex, state.searchQuery]);

  return (
    <BottomSheet name="anthems">
      <Searchbar
        placeholder="Digite o número"
        keyboardType="numeric"
        onChangeText={text => {
          dispatch({type: 'SET_SEARCH_QUERY', payload: text});
        }}
        onClearIconPress={() => {
          dispatch({type: 'SET_SEARCH_QUERY', payload: ''});
        }}
        value={state.searchQuery}
        style={styles.marginHorizontal}
      />
      <BottomSheetFlatList
        ref={flatListRef}
        data={state.searchResults}
        initialNumToRender={5}
        contentContainerStyle={[styles.padding, styles.gap]}
        keyExtractor={item => item.id.toString()}
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

export default AnthemsModal;
