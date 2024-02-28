import React from 'react';
import {View, TextInput, Pressable} from 'react-native';
import {useNavigationHooks} from '../../store/hooks';
import Icon from '../Icon';
import {styles} from '../../utils/styles';

const SearchBar = () => {
  const {
    getSearchParams,
    setSearchQuery,
    setSearchTyping,
    searchReset,
    navigateBack,
  } = useNavigationHooks();
  const search = getSearchParams();
  const isTypingTimeout = React.useRef<NodeJS.Timeout | null>(null);
  const inputRef = React.useRef<TextInput>(null);

  const ICON_SIZE = 24;
  const ICON_COLOR = styles.app.textMuted.color;

  return (
    <View style={styles.app.searchBar}>
      <Pressable
        onPress={() => {
          searchReset();
          navigateBack();
        }}>
        <Icon name="arrow-left" size={24} color={styles.app.textMuted.color} />
      </Pressable>
      <TextInput
        ref={inputRef}
        style={styles.app.searchInput}
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
        value={search.query}
        editable={!search.disabled}
        keyboardAppearance="dark"
      />
      {search.query ? (
        <Pressable
          onPress={() => {
            searchReset();
          }}>
          <Icon name="close" size={ICON_SIZE} color={ICON_COLOR} />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => {
            inputRef.current?.focus();
          }}>
          <Icon name="magnify" size={ICON_SIZE} color={ICON_COLOR} />
        </Pressable>
      )}
    </View>
  );
};

export default SearchBar;
