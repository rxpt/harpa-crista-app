import React from 'react';
import {View} from 'react-native';
import {flex} from '../utils/styles';
import SearchResults from '../components/Search/Results';

const SearchScreen: React.FC = () => {
  return (
    <View style={flex.flex1}>
      <SearchResults />
    </View>
  );
};

export default React.memo(SearchScreen);
