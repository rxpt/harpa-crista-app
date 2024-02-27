import React, {useRef} from 'react';
import {
  BottomSheetFlatList,
  BottomSheetFlatListMethods,
} from '@gorhom/bottom-sheet';
import ModalTitle from '../ModalTitle';
import {styles} from '../../utils/styles';

interface ModalFlatListProps<T>
  extends React.ComponentProps<typeof BottomSheetFlatList<T>> {
  data: T[];
  title?: string;
  subtitle?: string;
  onEndReached?: (info: {distanceFromEnd: number}) => void;
  onStartReached?: (info: {distanceFromStart: number}) => void;
  ListHeaderComponent?: React.ComponentType<any>;
}

const ModalFlatList = <T,>({
  data,
  title,
  subtitle,
  contentContainerStyle,
  ListHeaderComponent,
  ...props
}: ModalFlatListProps<T>) => {
  const modalRef = useRef<BottomSheetFlatListMethods>(null);

  return (
    <BottomSheetFlatList
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
