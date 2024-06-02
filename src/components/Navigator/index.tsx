import React from 'react';
import {BackHandler, View} from 'react-native';
import Text from '../Text';
import {useNavigationHooks} from '../../store/hooks';

interface Screen {
  title: string;
  component: React.FC<any>;
}

const NotFound = ({name}: {name: string}) => {
  return (
    <View>
      <Text>Tela não encontrada: {name}</Text>
    </View>
  );
};

const Navigator = ({
  initial,
  screens,
}: {
  initial?: string;
  screens: {[key: string]: Screen};
}) => {
  const {
    navigateTo,
    navigateBack,
    canGoBack: canGoBackFn,
  } = useNavigationHooks();
  const canGoBack = canGoBackFn();

  React.useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (canGoBack) {
          navigateBack();
          return true;
        }
        return false;
      },
    );

    return () => backHandler.remove();
  }, [canGoBack, navigateBack]);

  const {getState} = useNavigationHooks();
  const currentScreen = getState().screens.current;
  const currentScreenName = currentScreen?.name;
  const screenExists = currentScreenName && screens[currentScreenName];
  const initialExists = !!initial && !!screens[initial];
  const firstScreen = Object.keys(screens)[0];
  initial = initialExists ? initial : firstScreen;
  const isInitial = !!initial && !currentScreenName;
  const notFoundExists = !!screens.notFound && !!screens.notFound.component;
  if (!notFoundExists) {
    screens.notFound = {
      title: 'Not Found',
      component: NotFound,
    };
  }

  React.useEffect(() => {
    if (isInitial) {
      navigateTo(initial as string);
    } else if (!screenExists) {
      navigateTo('notFound', {name: currentScreenName});
    }
  }, [currentScreenName, initial, isInitial, navigateTo, screenExists]);

  if (!screenExists) {
    return null;
  }

  const CurrentComponent =
    screens[currentScreen && currentScreen.name].component;

  return <CurrentComponent {...currentScreen?.params} />;
};

export default Navigator;
