import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import AnthemScreen from './screens/AnthemScreen';
import {PaperProvider} from 'react-native-paper';
import {ThemeProp} from 'react-native-paper/lib/typescript/types';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {AppProvider} from './providers/AppProvider';
import {theme} from './utils/theme';

export default function App() {
  return (
    <PaperProvider theme={theme as ThemeProp}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.background}
        showHideTransition={'slide'}
        hidden={true}
      />
      <BottomSheetModalProvider>
        <AppProvider>
          <AnthemScreen />
        </AppProvider>
      </BottomSheetModalProvider>
    </PaperProvider>
  );
}
