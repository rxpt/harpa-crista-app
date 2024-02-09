import React from 'react';
import {Dimensions} from 'react-native';
import {BottomSheetFlatList, BottomSheetModal} from '@gorhom/bottom-sheet';
import {Appbar, Button, Divider, Text} from 'react-native-paper';
import {styles, theme} from '../utils/theme';
import {useAppContext} from '../providers/AppProvider';
import {getAnthem} from '../utils';

type FavoritesModalProps = {
  open: boolean;
  onDismiss?: () => void;
  onAnthemSelect: (anthem: any) => void;
};

const FavoritesModal = ({
  open,
  onDismiss,
  onAnthemSelect,
}: FavoritesModalProps) => {
  const favoritesModalRef = React.useRef(null);
  const {height} = Dimensions.get('window');
  const {
    state: {favorites},
  } = useAppContext();

  const getFavorites = () => favorites.map(favorite => getAnthem(favorite));

  React.useEffect(() => {
    if (open) {
      (favoritesModalRef.current as any)?.present();
    } else {
      (favoritesModalRef.current as any)?.dismiss();
    }
  }, [open]);

  return (
    <BottomSheetModal
      ref={favoritesModalRef}
      snapPoints={[height / 2]}
      onDismiss={onDismiss}
      backgroundStyle={{
        backgroundColor: theme.colors.onSecondary,
      }}
      handleIndicatorStyle={{
        backgroundColor: theme.colors.secondary,
      }}>
      <Appbar.Header
        mode="center-aligned"
        style={{
          backgroundColor: theme.colors.onSecondary,
        }}>
        <Appbar.Content title="Favoritos" />
      </Appbar.Header>
      <Divider />
      <BottomSheetFlatList
        data={getFavorites()}
        ListEmptyComponent={<Text>Adicione seus hinos favoritos</Text>}
        initialNumToRender={5}
        contentContainerStyle={[styles.padding, styles.gap]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => {
          return (
            <Button
              mode="outlined"
              onPress={() => {
                (favoritesModalRef.current as any)?.dismiss();
                onAnthemSelect(item);
              }}>
              <Text>
                {item.id}. {item.title}
              </Text>
            </Button>
          );
        }}
      />
    </BottomSheetModal>
  );
};

export default FavoritesModal;
