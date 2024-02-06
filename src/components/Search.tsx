import React, {
  useState,
  useCallback,
  useRef,
  createContext,
  useContext,
} from 'react';
import {View} from 'react-native';
import {Searchbar} from 'react-native-paper';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {styles} from '../utils/theme';

const SearchContext = createContext<any>(null);

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({children}: any) => {
  const [searchOpen, setSearchOpen] = useState(true);

  const open = useCallback(() => {
    setSearchOpen(true);
  }, []);

  const close = useCallback(() => {
    setSearchOpen(false);
  }, []);

  return (
    <SearchContext.Provider value={{open, close, searchOpen}}>
      {children}
    </SearchContext.Provider>
  );
};

export const Search = (): JSX.Element => {
  const {searchOpen} = useSearchContext();

  const navigation = useNavigation<NavigationProp<any>>();
  const searchRef = useRef<any>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);

      navigation.navigate<any>('home', {searchQuery: query});
    },
    [navigation],
  );

  return (
    <View style={[styles.flexRow, styles.spaceBetween, styles.alignCenter]}>
      {searchOpen && (
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
