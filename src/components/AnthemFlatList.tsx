import React, {useRef, useMemo, useState, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {useFocusEffect} from '@react-navigation/native';
import BottomSheet, {BottomSheetFlatList} from '@gorhom/bottom-sheet';
import {useAppContext, actions} from '../contexts/AppContext';
import lodash from 'lodash';
import Item from '../components/Item';
import indexes from '../data/indexes.json';
import anthems from '../data/anthems.json';
import {Anthem} from '../utils/interfaces';
import {styles, theme} from '../utils/theme';

const AnthemFlatList = () => {
  const {
    state: {searchQuery},
    dispatch,
  } = useAppContext();

  const [data, setData] = useState<Anthem[]>([]);

  const flatListRef = useRef(null);
  const bottomFlatListRef = useRef(null);
  const sheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (searchQuery) {
      const filteredAnthems = anthems.filter(anthem =>
        anthem.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setData(filteredAnthems);
    } else {
      setData(anthems);
    }
  }, [searchQuery]);

  useFocusEffect(
    useMemo(() => {
      return () => {
        dispatch(actions.scrollRef(flatListRef));

        flatListRef.current &&
          (flatListRef.current as any)?.scrollToOffset({offset: 0});

        bottomFlatListRef.current &&
          (bottomFlatListRef.current as any).scrollToOffset({offset: 0});
      };
    }, [dispatch]),
  );

  const renderItem = ({item}: {item: Anthem}) => (
    <Item screen="anthem" params={item} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={data as Anthem[]}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onScroll={e => {
          const currentOffset =
            Math.floor(e.nativeEvent?.contentOffset?.y) ?? 0;

          dispatch(actions.scroll(currentOffset));
        }}
        contentInsetAdjustmentBehavior="automatic"
      />
      <BottomSheet
        ref={sheetRef}
        snapPoints={[25, '50%']}
        onChange={index => {
          if (index === 1) {
            setData(anthems);

            (flatListRef.current as any)?.scrollToOffset({offset: 0});
          }
        }}
        backgroundStyle={{
          backgroundColor: theme.colors.onSecondary,
        }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.secondary,
        }}>
        <BottomSheetFlatList
          ref={bottomFlatListRef}
          data={lodash.orderBy(indexes, ['title'], ['asc'])}
          ListHeaderComponent={
            <Text variant="headlineLarge" style={styles.centered}>
              Índice de Assuntos
            </Text>
          }
          contentContainerStyle={[styles.padding, styles.gap]}
          keyExtractor={item => item.title + item.anthems.length}
          renderItem={({item}) => {
            return (
              <Button
                mode="outlined"
                onPress={() => {
                  (flatListRef.current as any)?.scrollToIndex({
                    animated: true,
                    index: 0,
                  });
                  if (item.anthems.length > 1) {
                    setData(
                      anthems.filter(anthem =>
                        item.anthems.includes(anthem.id),
                      ),
                    );
                  } else {
                    setData(anthems);
                  }
                }}>
                <Text variant="titleMedium">{item.title}</Text>
              </Button>
            );
          }}
        />
      </BottomSheet>
    </View>
  );
};

export default AnthemFlatList;
