import React, {useState, useLayoutEffect} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import {human, materialColors} from 'react-native-typography';
import {Anthem} from '../utils/interfaces';
import anthems from '../data/anthems.json';
import Item from '../components/Item';
import Icon from '../components/Icon';
import AnthemFlatList from '../components/AnthemFlatList';

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

  if (isMenuOpen) {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Item
            screen="topicList"
            params={{
              title: 'Índice dos assuntos',
            }}
          />
        </ScrollView>
      </View>
    );
  }

  return <AnthemFlatList data={filteredAnthem} />;
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
