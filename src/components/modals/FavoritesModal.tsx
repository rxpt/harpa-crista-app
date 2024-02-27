import React from 'react';
import {useAnthemHooks} from '../../store/hooks';
import Text from '../Text';
import ButtonSelectAnthem from '../Button/SelectAnthem';
import ModalFlatList from '../ModalFlatList';

const FavoritesModal = () => {
  const anthemHooks = useAnthemHooks();

  return (
    <ModalFlatList
      title="Hinos Favoritos"
      subtitle="Seus hinos favoritos"
      data={anthemHooks.getFavorites()}
      ListEmptyComponent={<Text>Adicione seus hinos favoritos</Text>}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item: {number, title}}) => {
        return <ButtonSelectAnthem number={number} title={title} />;
      }}
    />
  );
};

export default FavoritesModal;
