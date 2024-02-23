import React from 'react';
import {Dimensions} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useAppContext} from '../../providers/AppProvider';
import {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import {theme} from '../../utils/theme';

type BottomSheetProps = React.PropsWithChildren<{
  name: string;
  snapPoints?: number[] | string[];
}>;

const BackdropModal = (props: any) => {
  return (
    <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
  );
};

const BottomSheet = ({children, name, snapPoints}: BottomSheetProps) => {
  const {
    state: {currentModal},
    dispatch,
  } = useAppContext();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const {height} = Dimensions.get('window');

  if (!snapPoints) {
    snapPoints = [height * 0.5, height * 0.8];
  }

  React.useMemo(() => {
    if (currentModal === name && !isModalVisible) {
      bottomSheetRef.current?.present();
      setIsModalVisible(true);
    } else if (currentModal !== name && isModalVisible) {
      bottomSheetRef.current?.dismiss();
      setIsModalVisible(false);
    }
  }, [currentModal, isModalVisible, name]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      onDismiss={() => {
        if (isModalVisible) {
          dispatch({type: 'SET_CURRENT_MODAL', payload: null});
        }
      }}
      snapPoints={snapPoints}
      backdropComponent={BackdropModal}
      backgroundStyle={{
        backgroundColor: theme.colors.background,
      }}
      handleIndicatorStyle={{
        backgroundColor: theme.colors.onBackground,
      }}>
      {children}
    </BottomSheetModal>
  );
};

export default BottomSheet;
