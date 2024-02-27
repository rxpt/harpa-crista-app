import React from 'react';
import {View} from 'react-native';
import ModalFlatList from '../ModalFlatList';
import {useAnthemHooks, useNavigationHooks} from '../../store/hooks';
import ButtonSelectAnthem from '../Button/SelectAnthem';
import SearchBar from '../SearchBar';
import Text from '../Text';
import Icon from '../Icon';
import {flex, padding, styles} from '../../utils/styles';

const AnthemsModal = () => {
  const {getState: navigateState} = useNavigationHooks();
  const anthemHooks = useAnthemHooks();
  const {search} = navigateState();
  const searchedAnthems = anthemHooks.getSearchResults();

  return (
    <ModalFlatList
      data={searchedAnthems}
      keyExtractor={item => item._id.$oid}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={SearchBar}
      ListEmptyComponent={
        <View
          style={[
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
        return <ButtonSelectAnthem number={number} title={title} />;
      }}
    />
  );
};

export default AnthemsModal;
