import React, {useLayoutEffect, useState, useRef} from 'react';
import {View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {human, materialColors} from 'react-native-typography';
import Item from '../components/Item';
import Icon from '../components/Icon';
import anthemTopics from '../data/anthems_topics.json';
import anthems from '../data/anthems.json';
import {Anthem} from '../utils/interfaces';

const TopicItemsScreen: React.FC = ({route, navigation}: any) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const flatListRef = useRef(null);
  const {topicId, title} = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation, title]);

  const filteredAnthem = anthemTopics
    .filter((anthemTopic: any) => {
      return anthemTopic.topicId === topicId;
    })
    .map((anthemTopic: any) => {
      return anthems.find((anthem: any) => anthem.id === anthemTopic.anthemId);
    });

  const handleTitlePress = () => {
    if (flatListRef.current) {
      (flatListRef.current as any)?.scrollToOffset({offset: 0, animated: true});
    }
  };

  const renderItem = ({item}: {item: Anthem}) => (
    <Item id={item.id} title={item.title} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={filteredAnthem as Anthem[]}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        onScroll={event => {
          setScrollPosition(event.nativeEvent.contentOffset.y);
        }}
        contentInsetAdjustmentBehavior="automatic"
      />
      {scrollPosition > 100 && (
        <TouchableOpacity style={styles.backToTop} onPress={handleTitlePress}>
          <Icon name="arrow-up" size={20} color={materialColors.whitePrimary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: materialColors.blackPrimary,
  },
  text: {
    color: materialColors.whitePrimary,
    fontSize: human.title3Object.fontSize,
  },
  menuIcon: {
    padding: 10,
  },
  menuContent: {
    padding: 20,
  },
  backToTop: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: materialColors.blackTertiary,
    padding: 20,
    borderRadius: 10,
  },
});

export default TopicItemsScreen;
