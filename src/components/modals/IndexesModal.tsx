import React from 'react';
import {
  BottomSheetSectionList,
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import {getIndexes} from '../../utils';
import ButtonSelectAnthem from '../Button/SelectAnthem';
import ModalTitle from '../ModalTitle';
import {margin, styles} from '../../utils/styles';
import {StyleSheet} from 'react-native';

const IndexesModal = () => {
  return (
    <BottomSheetSectionList
      contentContainerStyle={styles.app.modalContent}
      keyExtractor={item => item.toString()}
      stickyHeaderIndices={[0]}
      ListHeaderComponent={<ModalTitle title="Índice de assuntos" />}
      sections={getIndexes()}
      renderSectionHeader={({section: {title, data}}) => (
        <React.Fragment>
          <ModalTitle subtitle={title} goBack={false} />
          <BottomSheetFlatList
            data={data}
            horizontal
            style={margin(-15, 'horizontal')}
            contentContainerStyle={margin(10, 'horizontal')}
            showsHorizontalScrollIndicator
            keyExtractor={item => item.toString()}
            renderItem={({item}) => (
              <ButtonSelectAnthem number={item} style={itemStyles.item} />
            )}
          />
        </React.Fragment>
      )}
      stickyHeaderHiddenOnScroll={true}
      renderItem={() => {
        return null;
      }}
    />
  );
};

const itemStyles = StyleSheet.create({
  item: {
    margin: 5,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
});

export default IndexesModal;
