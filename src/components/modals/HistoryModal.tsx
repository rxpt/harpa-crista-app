import React from 'react';
import {useAnthemHooks} from '../../store/hooks';
import ButtonSelectAnthem from '../Button/SelectAnthem';
import ModalFlatList from '../ModalFlatList';

const HistoryModal = () => {
  const anthemHooks = useAnthemHooks();

  return (
    <ModalFlatList
      data={anthemHooks.getHistory()}
      title="Histórico"
      subtitle="Seus hinos recentes"
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item}) => {
        return <ButtonSelectAnthem number={item.number} title={item.title} />;
      }}
    />
  );
};

export default HistoryModal;
