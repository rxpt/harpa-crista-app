import React from 'react';
import {StatusBar} from 'react-native';
import AnthemScreen from './screens/AnthemScreen';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {flex, styles, theme} from './utils/styles';
import {enableScreens} from 'react-native-screens';
import {Provider} from 'react-redux';
import {store} from './store';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Navigator from './components/Navigator';

enableScreens();

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={[flex.flex1, styles.app.background]}>
          <StatusBar
            barStyle="light-content"
            backgroundColor={theme.background}
          />
          <BottomSheetModalProvider>
            <Navigator
              screens={{
                anthem: {
                  title: 'Harpa Cristã',
                  component: AnthemScreen,
                },
              }}
            />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </Provider>
  );
}
