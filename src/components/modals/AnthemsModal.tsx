import React from 'react';
import {View} from 'react-native';
import BottomSheet from './BottomSheet';
import {BottomSheetFlatList, TouchableOpacity} from '@gorhom/bottom-sheet';
import {Divider, Searchbar, SegmentedButtons, Text} from 'react-native-paper';
import {useAppContext} from '../../providers/AppProvider';
import {searchAnthems} from '../../utils';
import {styles} from '../../utils/theme';

const AnthemsModal = () => {
  const {state, dispatch} = useAppContext();
  const [searchType, setSearchType] = React.useState<'numeric' | 'default'>(
    'numeric',
  );

  React.useEffect(() => {
    dispatch({
      type: 'SET_SEARCH_RESULTS',
      payload: searchAnthems(
        state.searchIndex === -1 ? state.searchQuery : '',
        state.searchIndex,
      ),
    });
  }, [dispatch, state.searchIndex, state.searchQuery]);

  return (
    <BottomSheet name="anthems" snapPoints={['100%']}>
      {state.searchIndex === -1 && (
        <View>
          <Searchbar
            autoFocus
            placeholder="Pesquisar hinos"
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
            density="small"
            style={styles.marginHorizontal}
            value={searchType}
            onValueChange={value =>
              setSearchType(value as 'numeric' | 'default')
            }
            buttons={[
              {
                label: 'Teclado',
                value: '',
                disabled: true,
              },
              {
                icon: 'numeric',
                value: 'numeric',
              },
              {
                icon: 'format-title',
                value: 'default',
              },
            ]}
          />
        </View>
      )}
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
                  dispatch({type: 'SET_SEARCH_QUERY', payload: ''});
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
