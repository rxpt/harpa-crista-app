import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  PaperProvider,
  MD3DarkTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import {
  NavigationTheme,
  ThemeProp,
} from 'react-native-paper/lib/typescript/types';
import {SearchProvider, Search} from './components/Search';

// Theme
const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
  },
  dark: true,
  mode: 'adaptive',
};

// Navigation theme
const navigationTheme = adaptNavigationTheme({
  reactNavigationLight: MD3DarkTheme as unknown as NavigationTheme,
  reactNavigationDark: MD3DarkTheme as unknown as NavigationTheme,
});

// Screens
import HomeScreen from './screens/HomeScreen';
import AnthemScreen from './screens/AnthemScreen';
import TopicListScreen from './screens/TopicListScreen';
import TopicItemsScreen from './screens/TopicItemsScreen';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{
        animation: 'slide_from_right',
        headerShown: false,
      }}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="topicList" component={TopicListScreen} />
      <Stack.Screen name="topicItems" component={TopicItemsScreen} />
      <Stack.Screen name="anthem" component={AnthemScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <PaperProvider theme={theme as ThemeProp}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer
        theme={{...navigationTheme, dark: true, colors: theme.colors as any}}>
        <SearchProvider>
          <Search />
          <StackNavigator />
        </SearchProvider>
      </NavigationContainer>
    </PaperProvider>
  );
}
