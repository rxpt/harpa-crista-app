import React from 'react';
import {useWindowDimensions} from 'react-native';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import MenuModal from './MenuModal';
import AnthemsModal from './AnthemsModal';
import IndexesModal from './IndexesModal';
import HistoryModal from './HistoryModal';
import FavoritesModal from './FavoritesModal';
import {useNavigationHooks} from '../../store/hooks';
import {styles} from '../../utils/styles';

interface Modal {
  snapPoints?: number[];
  component: () => JSX.Element;
}

interface Modals {
  [key: string]: Modal;
}

const BackdropModal = (props: any) => {
  return (
    <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
  );
};

const Modals = () => {
  const {height} = useWindowDimensions();
  const {getState, clearModals} = useNavigationHooks();
  const currentModal = getState().modals.current;
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const defaultSnapPoints = React.useMemo(
    () => [height * 0.5, height * 0.75, height],
    [height],
  );
  const modals: Modals = React.useMemo(() => {
    return {
      menu: {
        component: MenuModal,
      },
      indexes: {
        component: IndexesModal,
      },
      history: {
        component: HistoryModal,
      },
      favorites: {
        component: FavoritesModal,
      },
      anthems: {
        snapPoints: [height],
        component: AnthemsModal,
      },
    };
  }, [height]);

  React.useEffect(() => {
    if (currentModal) {
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.forceClose();
    }
  }, [currentModal]);

  const ModalComponent = currentModal && modals[currentModal].component;

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      onDismiss={clearModals}
      snapPoints={React.useMemo(() => {
        if (currentModal && modals[currentModal].snapPoints) {
          return modals[currentModal].snapPoints;
        }
        return defaultSnapPoints;
      }, [currentModal, defaultSnapPoints, modals])}
      backdropComponent={BackdropModal}
      backgroundStyle={styles.app.modalBackground}
      handleIndicatorStyle={styles.app.modalIndicator}>
      {ModalComponent}
    </BottomSheetModal>
  );
};

export default Modals;
