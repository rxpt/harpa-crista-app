import React from 'react';
import {Linking} from 'react-native';
import {FAB} from 'react-native-paper';
import {useAppContext} from '../providers/AppProvider';
import TrackPlayer from 'react-native-track-player';
import {anthemAudioURL, randomAnthem} from '../utils';
import {theme} from '../utils/theme';

const MenuButton = () => {
  const {state, dispatch} = useAppContext();

  return (
    <FAB.Group
      open={state.bottomMenu}
      visible
      backdropColor={theme.colors.secondaryContainer}
      icon={state.bottomMenu ? 'close' : 'plus'}
      actions={[
        {
          icon: 'heart-outline',
          label: 'Favoritos',
          onPress: () =>
            dispatch({type: 'SET_CURRENT_MODAL', payload: 'favorites'}),
        },
        {
          icon: 'history',
          label: 'Histórico',
          onPress: () =>
            dispatch({type: 'SET_CURRENT_MODAL', payload: 'history'}),
        },
        {
          icon: 'format-list-bulleted-square',
          label: 'Índices de Assuntos',
          onPress: () =>
            dispatch({type: 'SET_CURRENT_MODAL', payload: 'indexes'}),
        },
        {
          icon: 'magnify',
          label: 'Pesquisar',
          onPress: () =>
            dispatch({type: 'SET_CURRENT_MODAL', payload: 'anthems'}),
        },
        {
          icon: 'shuffle-variant',
          label: 'Hino aleatório',
          onPress: () =>
            dispatch({type: 'SET_CURRENT_ANTHEM', payload: randomAnthem()}),
        },
        {
          icon: state.isPlaying ? 'stop' : 'play',
          label: state.isPlaying ? 'Parar' : 'Ouvir hino',
          onPress: async () => {
            if (state.isPlaying) {
              await TrackPlayer.stop();
            } else {
              await TrackPlayer.load({
                url: anthemAudioURL(state.currentAnthem.id),
                title: state.currentAnthem.title,
                artist: state.currentAnthem.author,
              });
              await TrackPlayer.play();
            }
          },
        },
        {
          icon: 'information',
          label: 'Sobre o app',
          onPress: () =>
            Linking.openURL('https://github.com/rxog/harpa-crista'),
        },
        {
          icon: 'alert',
          label: 'Reportar erro',
          onPress: () =>
            Linking.openURL(
              `mailto:dev@ronis.com.br?subject=Harpa Cristã: Erro no hino ${state.currentAnthem.id}`,
            ),
        },
      ]}
      onStateChange={({open}) => {
        dispatch({type: 'SET_BOTTOM_MENU', payload: open});
      }}
      onPress={() => {
        dispatch({type: 'SET_BOTTOM_MENU', payload: true});
      }}
    />
  );
};

export default MenuButton;
