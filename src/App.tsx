import React from 'react';
import {StatusBar} from 'react-native';
import AnthemScreen from './screens/AnthemScreen';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppProvider} from './providers/AppProvider';
import {flex, styles} from './utils/styles';
import {colors} from './utils/styles/colors';

export default function App() {
  return (
    <GestureHandlerRootView style={[flex.flex1, styles.app.background]}>
      <AppProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor={colors.surfaceVariant100}
        />
        <BottomSheetModalProvider>
          <AnthemScreen />
        </BottomSheetModalProvider>
      </AppProvider>
    </GestureHandlerRootView>
  );
}
