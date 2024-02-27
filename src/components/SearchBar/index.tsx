import React from 'react';
import {View, TextInput} from 'react-native';
import {useNavigationHooks} from '../../store/hooks';
import Icon from '../Icon';
import {styles} from '../../utils/styles';

const SearchBar = () => {
  const {getSearchParams, setSearchQuery, setSearchTyping} =
    useNavigationHooks();
  const search = getSearchParams();
  const isTypingTimeout = React.useRef<NodeJS.Timeout | null>(null);
  return (
    <View style={styles.app.searchBar}>
      <Icon name="magnify" size={24} color={styles.app.textMuted.color} />
      <TextInput
        style={styles.app.searchInput}
        autoFocus
        placeholderTextColor={styles.app.textMuted.color}
        placeholder="Digite número ou título..."
        keyboardType="default"
        onChangeText={text => {
          setSearchQuery(text);
          isTypingTimeout.current = setTimeout(() => {
            setSearchTyping(false);
          }, 500);
          if (isTypingTimeout.current) {
            clearTimeout(isTypingTimeout.current);
          } else {
            setSearchTyping(true);
          }
        }}
        clearButtonMode="while-editing"
        value={search.query}
        editable={!search.disabled}
      />
    </View>
  );
};

export default SearchBar;
