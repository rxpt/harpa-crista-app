import React from 'react';
import {Dimensions} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useAppContext} from '../providers/AppProvider';
import BackdropModal from './BackdropModal';
import {theme} from '../utils/theme';

type BottomSheetProps = React.PropsWithChildren<{
  name: string;
}>;

const BottomSheet = ({children, name}: BottomSheetProps) => {
  const {state, dispatch} = useAppContext();

  const bottomSheetRef = React.useRef(null);
  const {height} = Dimensions.get('window');

  //const open = () => dispatch({type: 'SET_CURRENT_MODAL', payload: name});
  const close = () => dispatch({type: 'SET_CURRENT_MODAL', payload: null});

  React.useEffect(() => {
    if (state.currentModal === name) {
      (bottomSheetRef.current as any)?.present();
    } else {
      (bottomSheetRef.current as any)?.dismiss();
    }
  }, [state.currentModal, name]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={[height / 2, height]}
      backdropComponent={BackdropModal}
      onDismiss={close}
      backgroundStyle={{
        backgroundColor: theme.colors.onSecondary,
      }}
      handleIndicatorStyle={{
        backgroundColor: theme.colors.secondary,
      }}>
      {children}
    </BottomSheetModal>
  );
};

export default BottomSheet;
