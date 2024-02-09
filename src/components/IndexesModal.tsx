import React from 'react';
import {Dimensions} from 'react-native';
import {BottomSheetFlatList, BottomSheetModal} from '@gorhom/bottom-sheet';
import {Appbar, Button, Divider, Text} from 'react-native-paper';
import {styles, theme} from '../utils/theme';
import {getIndexes} from '../utils';

type IndexesModalProps = {
  open: boolean;
  onDismiss?: () => void;
  onSearchIndexChange: (index: number) => void;
};

const IndexesModal = ({
  open,
  onDismiss,
  onSearchIndexChange,
}: IndexesModalProps) => {
  const indexesModalRef = React.useRef(null);
  const {height} = Dimensions.get('window');

  React.useEffect(() => {
    if (open) {
      (indexesModalRef.current as any)?.present();
    } else {
      (indexesModalRef.current as any)?.dismiss();
    }
  }, [open]);

  return (
    <BottomSheetModal
      ref={indexesModalRef}
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
        <Appbar.Content title="Índice de Assuntos" />
      </Appbar.Header>
      <Divider />
      <BottomSheetFlatList
        data={getIndexes()}
        initialNumToRender={5}
        contentContainerStyle={[styles.padding, styles.gap]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => {
          return (
            <Button
              mode="outlined"
              onPress={() => {
                (indexesModalRef.current as any)?.dismiss();
                onSearchIndexChange(item.anthems?.length > 0 ? index : -1);
              }}>
              <Text>{item.title}</Text>
            </Button>
          );
        }}
      />
    </BottomSheetModal>
  );
};

export default IndexesModal;
