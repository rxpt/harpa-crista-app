import React, {useCallback, useRef, useEffect} from 'react';
import {View, Dimensions} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {useAppContext, actions} from '../contexts/AppContext';
import {styles} from '../utils/theme';

export const Search = (): JSX.Element => {
  const {
    state: {showSearch, scrollY, searchQuery},
    dispatch,
  } = useAppContext();

  const {height} = Dimensions.get('window');

  const navigation = useNavigation<NavigationProp<any>>();
  const searchRef = useRef<any>(null);

  useEffect(() => {
    dispatch(actions.searchRef(searchRef));
  }, [dispatch]);

  useEffect(() => {
    dispatch(actions.showSearch(scrollY < height / 2 || !scrollY));
  }, [dispatch, height, scrollY]);

  const onChangeSearch = useCallback(
    (query: string) => {
      dispatch(actions.searchQuery(query));
      navigation.navigate<any>('home');
    },
    [dispatch, navigation],
  );

  return (
    <View style={[styles.flexRow, styles.spaceBetween, styles.alignCenter]}>
      {showSearch && (
        <Searchbar
          ref={searchRef}
          placeholder="Digite o número ou título"
          onChangeText={onChangeSearch}
          onClearIconPress={() => onChangeSearch('')}
          onIconPress={() => searchRef.current?.focus()}
          value={searchQuery}
        />
      )}
    </View>
  );
};
