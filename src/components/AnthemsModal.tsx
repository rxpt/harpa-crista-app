import React from 'react';
import BottomSheet from './BottomSheet';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {Divider, Searchbar, SegmentedButtons, Text} from 'react-native-paper';
import {TouchableOpacity, View} from 'react-native';
import {useAppContext} from '../providers/AppProvider';
import {searchAnthems} from '../utils';
import {styles} from '../utils/theme';

const AnthemsModal = () => {
  const {state, dispatch} = useAppContext();
  const [searchType, setSearchType] = React.useState<'numeric' | 'default'>(
    'numeric',
  );

  React.useEffect(() => {
    dispatch({
      type: 'SET_SEARCH_RESULTS',
      payload: searchAnthems(state.searchQuery, state.searchIndex),
    });
  }, [dispatch, state.searchIndex, state.searchQuery]);

  return (
    <BottomSheet name="anthems">
      <Searchbar
        placeholder={`Pesquisar hino ${
          searchType === 'numeric' ? 'por número' : 'por título'
        }`}
        keyboardType={searchType}
        onChangeText={text => {
          dispatch({type: 'SET_SEARCH_QUERY', payload: text});
        }}
        onClearIconPress={() => {
          dispatch({type: 'SET_SEARCH_QUERY', payload: ''});
        }}
        value={state.searchQuery}
        style={styles.marginHorizontal}
      />
      <SegmentedButtons
        style={styles.marginHorizontal}
        density="small"
        value={searchType}
        onValueChange={value => setSearchType(value as 'numeric' | 'default')}
        buttons={[
          {
            icon: 'numeric',
            value: 'numeric',
            label: 'Teclado numérico',
          },
          {
            icon: 'format-title',
            value: 'default',
            label: 'Teclado alfabético',
          },
        ]}
      />
      <BottomSheetFlatList
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
