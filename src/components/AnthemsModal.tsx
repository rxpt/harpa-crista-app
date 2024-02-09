import React from 'react';
import {Dimensions} from 'react-native';
import {BottomSheetFlatList, BottomSheetModal} from '@gorhom/bottom-sheet';
import {Divider, Searchbar, Text} from 'react-native-paper';
import {TouchableOpacity, View} from 'react-native';
import {styles, theme} from '../utils/theme';
import {searchAnthems} from '../utils';

type AnthemsModalProps = {
  open: boolean;
  searchIndex: number;
  onDismiss?: () => void;
  onAnthemSelect: (anthem: any) => void;
  onSearchQueryChange?: (query: string) => void;
  onSearchQueryClear?: () => void;
};

const AnthemsModal = ({
  open,
  searchIndex = -1,
  onDismiss,
  onAnthemSelect,
  onSearchQueryChange,
  onSearchQueryClear,
}: AnthemsModalProps) => {
  const anthemsModalRef = React.useRef(null);
  const anthemsModalFlatListRef = React.useRef(null);
  const {height} = Dimensions.get('window');

  const [searchQuery, setSearchQuery] = React.useState('');
  const [anthemList, setAnthemList] = React.useState(
    searchAnthems(searchQuery, searchIndex),
  );

  React.useEffect(() => {
    if (open) {
      (anthemsModalRef.current as any)?.present();
    } else {
      (anthemsModalRef.current as any)?.dismiss();
    }
  }, [open]);

  React.useEffect(() => {
    setAnthemList(searchAnthems(searchQuery, searchIndex));
  }, [searchIndex, searchQuery]);

  return (
    <BottomSheetModal
      ref={anthemsModalRef}
      snapPoints={[height]}
      backgroundStyle={{
        backgroundColor: theme.colors.onSecondary,
      }}
      handleIndicatorStyle={{
        backgroundColor: theme.colors.secondary,
      }}
      onDismiss={onDismiss}>
      <Searchbar
        placeholder="Digite o número ou título"
        onChangeText={text => {
          onSearchQueryChange?.(text);
          setSearchQuery(text);
        }}
        onClearIconPress={() => {
          onSearchQueryClear?.();
          setSearchQuery('');
        }}
        value={searchQuery}
        style={styles.marginHorizontal}
      />
      <BottomSheetFlatList
        ref={anthemsModalFlatListRef}
        data={anthemList}
        initialNumToRender={5}
        contentContainerStyle={[styles.padding, styles.gap]}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return (
            <View>
              <TouchableOpacity
                onPress={() => {
                  onAnthemSelect(item);
                  (anthemsModalRef.current as any)?.dismiss();
                }}>
                <View style={[styles.flexRow, styles.alignCenter]}>
                  {item.id && (
                    <View style={styles.number}>
                      <Text style={styles.centered}>{item.id}</Text>
                    </View>
                  )}
                  <Text variant="titleMedium" style={styles.title}>
                    {item.title}
                  </Text>
                </View>
              </TouchableOpacity>
              <Divider />
            </View>
          );
        }}
      />
    </BottomSheetModal>
  );
};

export default AnthemsModal;
