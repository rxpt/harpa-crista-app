import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {materialColors, robotoWeights} from 'react-native-typography';

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
        headerStyle: {
          backgroundColor: materialColors.blackPrimary,
        },
        headerTintColor: materialColors.whitePrimary,
        headerTitleStyle: {
          color: materialColors.whitePrimary,
          fontFamily: robotoWeights.light.fontFamily,
          fontWeight: robotoWeights.light.fontWeight,
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="topicList" component={TopicListScreen} />
      <Stack.Screen name="topicItems" component={TopicItemsScreen} />
      <Stack.Screen
        name="anthem"
        component={AnthemScreen}
        options={({route}: {route: {params?: {title?: string}}}) => ({
          title: route?.params?.title ?? undefined,
        })}
      />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor={materialColors.blackPrimary}
      />
      <StackNavigator />
    </NavigationContainer>
  );
}
