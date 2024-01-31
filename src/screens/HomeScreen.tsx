import React, {useRef, useState, useLayoutEffect} from 'react';
import {
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  ScrollView,
  Text,
} from 'react-native';
import {Link} from '@react-navigation/native';
import {human, materialColors} from 'react-native-typography';
import {Anthem} from '../utils/interfaces';
import anthems from '../data/anthems.json';
import Item from '../components/Item';
import Icon from '../components/Icon';

const MenuIcon = (state: boolean, onPress: () => void) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.menuIcon}>
      <Icon
        name={state ? 'close' : 'menu'}
        size={24}
        color={materialColors.whitePrimary}
      />
    </TouchableOpacity>
  );
};

const HomeScreen: React.FC = ({navigation}: any) => {
  const [search, setSearch] = React.useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const flatListRef = useRef(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Harpa Cristã',
      headerSearchBarOptions: {
        placeholder: 'Digite número ou título',
        textColor: materialColors.whitePrimary,
        headerIconColor: materialColors.whitePrimary,
        hintTextColor: materialColors.whiteSecondary,
        shouldShowHintSearchIcon: false,
        onChangeText: (event: NativeSyntheticEvent<TextInputFocusEventData>) =>
          setSearch(event.nativeEvent.text),
      },
      headerLeft: () => MenuIcon(isMenuOpen, () => setIsMenuOpen(!isMenuOpen)),
    });
  }, [navigation, isMenuOpen]);

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

  if (isMenuOpen) {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.menuContent}>
          <Link to="/topicList">
            <Text style={styles.text}>Índice dos assuntos</Text>
          </Link>
        </ScrollView>
      </View>
    );
  }

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

export default HomeScreen;
