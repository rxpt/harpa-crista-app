import React, {useRef, useState, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {AnimatedFAB} from 'react-native-paper';
import {useSearchContext} from './Search';
import {Anthem} from '../utils/interfaces';
import Item from '../components/Item';
import {styles} from '../utils/theme';

const AnthemFlatList = ({data}: any) => {
  const {open, close} = useSearchContext();
  const [scrollPosition, setScrollPosition] = useState(0);
  const flatListRef = useRef(null);

  useEffect(() => {
    if (scrollPosition > 100) {
      close();
    } else {
      open();
    }
  }, [close, open, scrollPosition]);

  const backToTop = () => {
    if (flatListRef.current) {
      (flatListRef.current as any)?.scrollToOffset({offset: 0, animated: true});
    }
  };

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
        onScroll={event => {
          const currentOffset =
            Math.floor(event.nativeEvent?.contentOffset?.y) ?? 0;
          setScrollPosition(currentOffset);
        }}
        contentInsetAdjustmentBehavior="automatic"
      />
      {scrollPosition > 100 && (
        <AnimatedFAB
          icon="arrow-up"
          label="Voltar"
          extended={false}
          onPress={backToTop}
          style={[styles.absolute, styles.end, styles.bottom, styles.margin]}
        />
      )}
    </View>
  );
};

export default AnthemFlatList;
