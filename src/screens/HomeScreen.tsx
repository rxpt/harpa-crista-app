import React, {useState, useLayoutEffect} from 'react';
import {
  TouchableOpacity,
  View,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  ScrollView,
} from 'react-native';
import {materialColors} from 'react-native-typography';
import {Anthem} from '../utils/interfaces';
import anthems from '../data/anthems.json';
import Item from '../components/Item';
import Icon from '../components/Icon';
import styles from '../utils/styles';
import AnthemFlatList from '../components/AnthemFlatList';

const MenuIcon = (state: boolean, onPress: () => void) => {
  return (
    <TouchableOpacity onPress={onPress}>
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
        onOpen: () => setIsMenuOpen(false),
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
        <ScrollView contentContainerStyle={styles.content}>
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

const HomeScreenMemo = React.memo(HomeScreen);

export default HomeScreenMemo;
