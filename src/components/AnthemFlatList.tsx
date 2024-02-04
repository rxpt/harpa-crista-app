import React, {useRef, useState} from 'react';
import {TouchableOpacity, FlatList, View} from 'react-native';
import {materialColors} from 'react-native-typography';
import {Anthem} from '../utils/interfaces';
import Item from '../components/Item';
import Icon from '../components/Icon';
import styles from '../utils/styles';
import {useScrollToTop} from '@react-navigation/native';

const AnthemFlatList = ({data}: any) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const flatListRef = useRef(null);
  useScrollToTop(flatListRef);

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
          setScrollPosition(event.nativeEvent.contentOffset.y);
        }}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.content}
      />
      {scrollPosition > 100 && (
        <TouchableOpacity style={styles.backToTop} onPress={backToTop}>
          <Icon name="arrow-up" size={20} color={materialColors.whitePrimary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AnthemFlatList;
