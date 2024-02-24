import React from 'react';
import {View, Keyboard} from 'react-native';
import BottomSheet from '../BottomSheetModal';
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import {Searchbar, SegmentedButtons} from 'react-native-paper';
import {useAppContext} from '../../providers/AppProvider';
import Text from '../Text';
import Icon from '../Icon';
import {styles} from '../../utils/theme';
import {flex, gap, padding} from '../../utils/styles';
import {searchAnthems} from '../../utils';

const AnthemsModal = () => {
  const {
    state: {searchQuery, searchResults, keyboardVisible},
    dispatch,
  } = useAppContext();
  const [searchType, setSearchType] = React.useState<'numeric' | 'default'>(
    'numeric',
  );
  const flatListRef = React.useRef<BottomSheetFlatListMethods>(null);

  React.useLayoutEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        dispatch({type: 'SET_KEYBOARD_VISIBLE', payload: true});
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        dispatch({type: 'SET_KEYBOARD_VISIBLE', payload: false});
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [dispatch]);

  React.useMemo(() => {
    dispatch({
      type: 'SET_SEARCH_RESULTS',
      payload: searchAnthems(searchQuery),
    });
  }, [dispatch, searchQuery]);

  React.useMemo(() => {
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
        contentContainerStyle={[padding(10), gap(5)]}
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
            elevation={2}
          />
        }
        ListEmptyComponent={
          <View
            style={[
              flex.flexColumn,
              flex.justifyCenter,
              flex.alignCenter,
              padding(20),
            ]}>
            <Icon name="magnify-close" size={48} />
            <Text>
              Hino não encontrado:{' '}
              <Text style={styles.textMuted}>{searchQuery}</Text>
            </Text>
          </View>
        }
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={[flex.flexRow, flex.alignCenter]}
              onPress={() => {
                dispatch({type: 'SET_CURRENT_ANTHEM', payload: item});
                dispatch({type: 'SET_CURRENT_MODAL', payload: null});
                dispatch({type: 'SET_SEARCH_QUERY', payload: ''});
              }}>
              {item.number && <Text style={flex.flex1}>{item.number}</Text>}
              <Text style={flex.flex12}>{item.title}</Text>
            </TouchableOpacity>
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
