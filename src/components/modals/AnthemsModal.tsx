import React from 'react';
import {View, Keyboard} from 'react-native';
import BottomSheet from '../BottomSheetModal';
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import {Divider, Searchbar, SegmentedButtons, Text} from 'react-native-paper';
import {useAppContext} from '../../providers/AppProvider';
import {searchAnthems} from '../../utils';
import {styles} from '../../utils/theme';
import Icon from '../Icon';

const AnthemsModal = () => {
  const {
    state: {searchQuery, searchResults},
    dispatch,
  } = useAppContext();
  const [searchType, setSearchType] = React.useState<'numeric' | 'default'>(
    'numeric',
  );
  const flatListRef = React.useRef<BottomSheetFlatListMethods>(null);
  const [keyboardVisible, setKeyboardVisible] = React.useState(false);

  React.useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  React.useEffect(() => {
    dispatch({
      type: 'SET_SEARCH_RESULTS',
      payload: searchAnthems(searchQuery),
    });
  }, [dispatch, searchQuery]);

  React.useEffect(() => {
    if (searchResults.length > 0) {
      flatListRef.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
    }
  }, [searchResults]);

  return (
    <BottomSheet name="anthems" snapPoints={['100%']}>
      <BottomSheetFlatList
        ref={flatListRef}
        data={searchResults}
        contentContainerStyle={[styles.padding, styles.gap]}
        keyExtractor={item => item._id.$oid}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <Searchbar
            autoFocus
            placeholder="Digite número ou título..."
            keyboardType={searchType}
            onChangeText={text => {
              dispatch({type: 'SET_SEARCH_QUERY', payload: text});
            }}
            onClearIconPress={() => {
              dispatch({type: 'SET_SEARCH_QUERY', payload: ''});
            }}
            value={searchQuery}
            style={[styles.searchInput]}
            elevation={2}
          />
        }
        ListEmptyComponent={
          <View
            style={[
              styles.flexColumn,
              styles.justifyCenter,
              styles.alignCenter,
              styles.paddingVertical,
            ]}>
            <Icon name="magnify-close" size={48} />
            <Text variant="titleMedium">
              Hino não encontrado:{' '}
              <Text style={styles.textMuted}>{searchQuery}</Text>
            </Text>
          </View>
        }
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
                  {item.number && (
                    <View style={styles.number}>
                      <Text style={styles.centered}>{item.number}</Text>
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
      {keyboardVisible && (
        <SegmentedButtons
          density="small"
          style={[styles.marginHorizontal]}
          value={searchType}
          onValueChange={value => setSearchType(value as 'numeric' | 'default')}
          buttons={[
            {
              label: 'Teclado',
              value: 'null',
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
      )}
    </BottomSheet>
  );
};

export default AnthemsModal;
