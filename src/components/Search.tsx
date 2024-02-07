import React, {useCallback, useRef, useEffect, useLayoutEffect} from 'react';
import {Animated} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {useAppContext, actions} from '../contexts/AppContext';
import {styles} from '../utils/theme';

export const Search = (): JSX.Element => {
  const {
    state: {showSearch, searchQuery},
    dispatch,
  } = useAppContext();

  const navigation = useNavigation<NavigationProp<any>>();
  const searchRef = useRef<any>(null);

  const animatedValue = useRef(new Animated.Value(0)).current;

  useLayoutEffect(() => {
    dispatch(actions.searchRef(searchRef));
  }, [dispatch]);

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: showSearch ? 1 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [animatedValue, showSearch]);

  const onChangeSearch = useCallback(
    (query: string) => {
      dispatch(actions.searchQuery(query));

      navigation.reset({
        index: 0,
        routes: [{name: 'home'}],
      });
    },
    [dispatch, navigation],
  );

  const onFocus = useCallback(() => {
    dispatch(actions.showSearch(true));
  }, [dispatch]);

  const focusSearch = useCallback(() => {
    searchRef.current?.focus();
  }, []);

  return (
    <Animated.View
      style={[
        styles.flexRow,
        styles.spaceBetween,
        styles.alignCenter,
        {
          height: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 56],
          }),
        },
      ]}>
      <Searchbar
        ref={searchRef}
        placeholder="Digite o número ou título"
        onChangeText={onChangeSearch}
        onClearIconPress={() => {
          onChangeSearch('');
          focusSearch();
        }}
        onIconPress={focusSearch}
        onFocus={onFocus}
        value={searchQuery}
      />
    </Animated.View>
  );
};
