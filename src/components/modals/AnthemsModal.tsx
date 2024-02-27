import React from 'react';
import {View} from 'react-native';
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from '@gorhom/bottom-sheet';
import {useAnthemHooks, useNavigationHooks} from '../../store/hooks';
import Text from '../Text';
import Icon from '../Icon';
import {flex, padding, styles} from '../../utils/styles';
import ButtonSelectAnthem from '../Button/SelectAnthem';
import SearchBar from '../SearchBar';

const AnthemsModal = () => {
  const {getState: navigateState} = useNavigationHooks();
  const anthems = useAnthemHooks();
  const searchedAnthems = anthems.getSearchResults();
  const {search} = navigateState();
  const flatListRef = React.useRef<BottomSheetFlatListMethods>(null);

  React.useMemo(() => {
    if (searchedAnthems.length > 0) {
      flatListRef.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
    }
  }, [searchedAnthems]);

  return (
    <BottomSheetFlatList
      ref={flatListRef}
      data={searchedAnthems}
      contentContainerStyle={styles.app.modalContent}
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
      renderItem={({item}) => {
        return <ButtonSelectAnthem number={item.number} title={item.title} />;
      }}
    />
  );
};

export default AnthemsModal;
