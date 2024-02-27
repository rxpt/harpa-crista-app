import React from 'react';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useAnthemHooks} from '../../store/hooks';
import Text from '../Text';
import {styles} from '../../utils/styles';
import ButtonSelectAnthem from '../Button/SelectAnthem';
import ModalTitle from '../ModalTitle';

const FavoritesModal = () => {
  const anthemHooks = useAnthemHooks();

  return (
    <BottomSheetFlatList
      ListHeaderComponent={
        <ModalTitle title="Favoritos" subtitle="Hinos marcados" />
      }
      data={anthemHooks.getFavorites()}
      ListEmptyComponent={<Text>Adicione seus hinos favoritos</Text>}
      contentContainerStyle={styles.app.modalContent}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item}) => {
        return <ButtonSelectAnthem number={item.number} title={item.title} />;
      }}
    />
  );
};

export default FavoritesModal;
