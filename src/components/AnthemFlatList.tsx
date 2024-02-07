import React, {useRef, useMemo, useState, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {Text, Button, Divider} from 'react-native-paper';
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

  const normalize = (str: string) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  useEffect(() => {
    if (searchQuery) {
      const filteredAnthems = anthems.filter(anthem => {
        return (
          anthem.id === parseInt(searchQuery, 10) ||
          normalize(anthem.title)
            .toLowerCase()
            .includes(normalize(searchQuery).toLowerCase())
        );
      });
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
        style={styles.marginBottom}
      />
      <BottomSheet
        ref={sheetRef}
        snapPoints={[25, '50%']}
        onChange={index => {
          if (index === 1) {
            setData(anthems);

            (flatListRef.current as any)?.scrollToOffset({offset: 0});
          } else {
            (bottomFlatListRef.current as any)?.scrollToOffset({offset: 0});
          }
        }}
        backgroundStyle={{
          backgroundColor: theme.colors.onSecondary,
        }}
        handleIndicatorStyle={{
          backgroundColor: theme.colors.secondary,
        }}>
        <Text
          variant="headlineSmall"
          style={[styles.centered, styles.marginBottom]}>
          Índice de Assuntos
        </Text>
        <Divider />
        <BottomSheetFlatList
          ref={bottomFlatListRef}
          data={lodash.orderBy(indexes, ['title'], ['asc'])}
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
                  if (item.anthems.length > 0) {
                    setData(
                      anthems.filter(anthem =>
                        item.anthems.includes(anthem.id),
                      ),
                    );
                  } else {
                    setData(anthems);
                  }
                }}>
                <Text>{item.title}</Text>
              </Button>
            );
          }}
        />
      </BottomSheet>
    </View>
  );
};

export default AnthemFlatList;
