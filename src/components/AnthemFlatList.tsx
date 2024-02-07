import React, {useRef, useEffect} from 'react';
import {FlatList, View} from 'react-native';
import {useAppContext, actions} from '../contexts/AppContext';
import {Anthem} from '../utils/interfaces';
import Item from '../components/Item';
import {styles} from '../utils/theme';

const AnthemFlatList = ({data}: any) => {
  const {dispatch} = useAppContext();
  const flatListRef = useRef(null);

  useEffect(() => {
    dispatch(actions.scrollRef(flatListRef));
  }, [dispatch]);

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

          dispatch(actions.scroll(currentOffset));
        }}
        contentInsetAdjustmentBehavior="automatic"
      />
    </View>
  );
};

export default AnthemFlatList;
