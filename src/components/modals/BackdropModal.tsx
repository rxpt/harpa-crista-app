import React from 'react';
import {BottomSheetBackdrop} from '@gorhom/bottom-sheet';

const BackdropModal = (props: any) => {
  return (
    <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
  );
};

export default BackdropModal;
