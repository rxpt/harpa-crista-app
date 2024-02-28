import React from 'react';
import {View} from 'react-native';
import ModalFlatList from '../ModalFlatList';
import {useAnthemHooks, useNavigationHooks} from '../../store/hooks';
import ButtonSelectAnthem from '../Button/SelectAnthem';
import SearchBar from './Bar';
import Text from '../Text';
import Icon from '../Icon';
import {flex, padding, styles} from '../../utils/styles';

const SearchResults = () => {
  const search = useNavigationHooks().getSearchParams();
  const searchedAnthems = useAnthemHooks().getSearchResults();

  const ButtonMemo = React.memo(ButtonSelectAnthem);

  return (
    <ModalFlatList
      type="native"
      windowSize={50}
      data={searchedAnthems}
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      removeClippedSubviews={true}
      keyExtractor={item => item._id.$oid}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={SearchBar}
      ListEmptyComponent={
        <View
          style={[
            flex.flex1,
            flex.flexColumn,
            flex.justifyCenter,
            flex.alignCenter,
            padding(20),
          ]}>
          <Icon
            name="magnify-close"
            size={48}
            color={styles.app.textMuted.color}
          />
          <Text>
            Hino não encontrado:{' '}
            <Text style={styles.app.textMuted}>{search.query}</Text>
          </Text>
        </View>
      }
      renderItem={({item: {number, title}}) => {
        return <ButtonMemo number={number} title={title} />;
      }}
    />
  );
};

export default SearchResults;
