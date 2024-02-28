import React, {useRef} from 'react';
import {FlatList, FlatListProps} from 'react-native';
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from '@gorhom/bottom-sheet';
import ModalTitle from '../ModalTitle';
import {styles} from '../../utils/styles';

interface ModalFlatListProps<T>
  extends FlatListProps<T>,
    Omit<typeof BottomSheetFlatList<T>, 'ListHeaderComponent'> {
  data: T[];
  title?: string;
  subtitle?: string;
  ListHeaderComponent?: React.ComponentType<any>;
  type?: 'native' | 'bottom-sheet';
}

const ModalFlatList = <T,>({
  data,
  title,
  subtitle,
  contentContainerStyle,
  ListHeaderComponent,
  type = 'bottom-sheet',
  ...props
}: ModalFlatListProps<T>) => {
  const modalRef = useRef<
    (FlatListProps<T> & BottomSheetFlatListMethods) | null
  >(null);

  const Component = type === 'bottom-sheet' ? BottomSheetFlatList : FlatList;

  return (
    <Component
      ref={modalRef}
      data={data}
      ListHeaderComponent={
        ListHeaderComponent ? (
          <ListHeaderComponent />
        ) : (
          <ModalTitle title={title} subtitle={subtitle} goBack />
        )
      }
      contentContainerStyle={[styles.app.modalContent, contentContainerStyle]}
      {...props}
    />
  );
};

export default ModalFlatList;
