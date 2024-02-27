import React from 'react';
import {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useAnthemHooks} from '../../store/hooks';
import {styles} from '../../utils/styles';
import ButtonSelectAnthem from '../Button/SelectAnthem';
import ModalTitle from '../ModalTitle';

const HistoryModal = () => {
  const anthemHooks = useAnthemHooks();

  return (
    <BottomSheetFlatList
      ListHeaderComponent={
        <ModalTitle title="Histórico" subtitle="Hinos recentes" />
      }
      data={anthemHooks.getHistory()}
      contentContainerStyle={styles.app.modalContent}
      keyExtractor={(_, index) => index.toString()}
      renderItem={({item}) => {
        return <ButtonSelectAnthem number={item.number} title={item.title} />;
      }}
    />
  );
};

export default HistoryModal;
