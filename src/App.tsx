import React from 'react';
import {StatusBar} from 'react-native';
import AnthemScreen from './screens/AnthemScreen';
import {PaperProvider} from 'react-native-paper';
import {ThemeProp} from 'react-native-paper/lib/typescript/types';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {AppProvider} from './providers/AppProvider';
import {styles, theme} from './utils/theme';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <PaperProvider theme={theme as ThemeProp}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={theme.colors.onPrimary}
        />
        <BottomSheetModalProvider>
          <AppProvider>
            <AnthemScreen />
          </AppProvider>
        </BottomSheetModalProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
