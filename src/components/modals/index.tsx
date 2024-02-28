import React from 'react';
import {useWindowDimensions} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  useBottomSheetModal,
} from '@gorhom/bottom-sheet';
import MenuModal from './MenuModal';
import IndexesModal from './IndexesModal';
import HistoryModal from './HistoryModal';
import FavoritesModal from './FavoritesModal';
import {useNavigationHooks} from '../../store/hooks';
import {styles} from '../../utils/styles';

interface Modals {
  [key: string]: () => JSX.Element;
}

const BackdropModal = (props: any) => {
  return (
    <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
  );
};

const Modals = () => {
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const {currentModal, clearModals} = useNavigationHooks();
  const currentModalName = currentModal()?.name;
  const {dismissAll} = useBottomSheetModal();
  const {height} = useWindowDimensions();
  const snapPoints = React.useMemo(
    () => [height * 0.5, height * 0.75, height],
    [height],
  );

  const ModalComponent = React.useMemo(() => {
    switch (currentModalName) {
      case 'menu':
        return MenuModal;
      case 'indexes':
        return IndexesModal;
      case 'history':
        return HistoryModal;
      case 'favorites':
        return FavoritesModal;
      default:
        return () => null;
    }
  }, [currentModalName]);

  const openModal = React.useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  const closeModal = React.useCallback(() => {
    dismissAll();
    clearModals();
  }, [clearModals, dismissAll]);

  React.useEffect(() => {
    currentModalName ? openModal() : closeModal();
  }, [currentModalName, openModal, closeModal]);

  if (!currentModalName) {
    return null;
  }

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      index={0}
      onDismiss={clearModals}
      snapPoints={snapPoints}
      backdropComponent={BackdropModal}
      backgroundStyle={styles.app.modalBackground}
      handleIndicatorStyle={styles.app.modalIndicator}>
      <ModalComponent />
    </BottomSheetModal>
  );
};

export default Modals;
