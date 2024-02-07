import React from 'react';
import AnthemFlatList from '../components/AnthemFlatList';

const HomeScreen: React.FC = () => {
  return <AnthemFlatList />;
};

const HomeScreenMemo = React.memo(HomeScreen);

export default HomeScreenMemo;
