import React from 'react';
import {useNavigationHooks} from '../../store/hooks';

interface Screen {
  title: string;
  component: React.FC<any>;
}

const Navigator = ({
  initial,
  screens,
}: {
  initial?: string;
  screens: {[key: string]: Screen};
}) => {
  const {getState} = useNavigationHooks();
  const currentScreen = getState().screens.current;

  if (!initial) {
    initial = Object.keys(screens)[0];
  }

  const CurrentComponent =
    screens[currentScreen ? currentScreen.name : initial].component;

  return <CurrentComponent {...currentScreen?.params} />;
};

export default Navigator;
