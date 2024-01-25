import React, {useRef, useState} from 'react';
import {
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
  TextInputFocusEventData,
  NativeSyntheticEvent,
} from 'react-native';
import {materialColors} from 'react-native-typography';
import {Anthem} from '../utils/interfaces';
import anthems from '../data/anthems.json';
import Item from '../components/Item';
import Icon from '../components/Icon';

const HomeScreen: React.FC = ({navigation}: any) => {
  const [search, setSearch] = React.useState('');
  const [scrollPosition, setScrollPosition] = useState(0);
  const flatListRef = useRef(null);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Harpa Cristã',
      headerSearchBarOptions: {
        placeholder: 'Digite o número ou o título',
        textColor: materialColors.whitePrimary,
        headerIconColor: materialColors.whitePrimary,
        hintTextColor: materialColors.whiteSecondary,
        shouldShowHintSearchIcon: false,
        onChangeText: (event: NativeSyntheticEvent<TextInputFocusEventData>) =>
          setSearch(event.nativeEvent.text),
      },
    });
  }, [navigation]);

  const filteredAnthem = anthems.filter((anthem: Anthem) => {
    return (
      anthem.title.toLowerCase().includes(search.toLowerCase()) ||
      anthem.id.toString().includes(search)
    );
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
        data={filteredAnthem}
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
  backToTop: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: materialColors.blackTertiary,
    padding: 20,
    borderRadius: 10,
  },
});

export default HomeScreen;
