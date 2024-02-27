import React from 'react';
import {getIndexes} from '../../utils';
import ButtonSelectAnthem from '../Button/SelectAnthem';
import ButtonSelectIndex from '../Button/SelectIndex';
import {styles} from '../../utils/styles';
import ModalFlatList from '../ModalFlatList';
import {useNavigationHooks, useAnthemHooks} from '../../store/hooks';

const IndexesModal = () => {
  const currentParams = useNavigationHooks().currentModal()?.params;
  const findAllAnthems = useAnthemHooks().findAll;

  if (currentParams) {
    const {title, data} = currentParams as {
      title: string;
      data: number[];
    };
    return (
      <ModalFlatList
        title={title}
        contentContainerStyle={styles.app.modalContent}
        keyExtractor={item => item._id.$oid}
        data={findAllAnthems(data)}
        renderItem={({item}) => (
          <ButtonSelectAnthem number={item.number} title={item.title} />
        )}
      />
    );
  }

  return (
    <ModalFlatList
      title="Índices de Assuntos"
      contentContainerStyle={styles.app.modalContent}
      keyExtractor={item => item._id.$oid}
      data={getIndexes()}
      renderItem={({item: {title, data}}) => (
        <ButtonSelectIndex title={title} data={data} />
      )}
    />
  );
};

export default IndexesModal;
