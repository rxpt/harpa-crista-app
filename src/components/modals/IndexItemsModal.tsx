import React from 'react';
import {getIndexes} from '../../utils';
import ButtonSelectAnthem from '../Button/SelectAnthem';
import ModalTitle from '../ModalTitle';
import {margin, styles} from '../../utils/styles';
import {StyleSheet} from 'react-native';
import ModalFlatList from '../ModalFlatList';

const IndexesModal = () => {
  return (
    <ModalFlatList
      title="Índices de Assuntos"
      contentContainerStyle={styles.app.modalContent}
      keyExtractor={item => item._id.$oid}
      data={getIndexes()}
      renderItem={({item: {title, data}}) => (
        <React.Fragment>
          <ModalTitle subtitle={title} />
          <ModalFlatList
            data={data}
            horizontal
            style={margin(-15, 'horizontal')}
            showsHorizontalScrollIndicator
            keyExtractor={item => item.toString()}
            renderItem={({item}) => (
              <ButtonSelectAnthem number={item} style={itemStyles.item} />
            )}
          />
        </React.Fragment>
      )}
    />
  );
};

const itemStyles = StyleSheet.create({
  item: {
    margin: 5,
    padding: 10,
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default IndexesModal;
