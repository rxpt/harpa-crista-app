import React from 'react';
import {View, Text} from 'react-native';
import lodash from 'lodash';
import categories from '../data/categories.json';

const CategoriesScreen = () => {
  return (
    <View>
      <Text>{lodash.map(categories, 'title').join(', ')}</Text>
    </View>
  );
};

export default CategoriesScreen;
