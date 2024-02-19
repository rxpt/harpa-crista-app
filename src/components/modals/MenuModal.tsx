import React from 'react';
import {Linking, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {useAppContext} from '../../providers/AppProvider';
import TrackPlayer from 'react-native-track-player';
import {anthemAudioURL, randomAnthem} from '../../utils';
import BottomSheet from './BottomSheet';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import {styles} from '../../utils/theme';
import Button from '../Button';

const MenuModal = () => {
  const {state, dispatch} = useAppContext();

  return (
    <BottomSheet name="mainMenu" snapPoints={['95%']}>
      <BottomSheetScrollView style={styles.padding}>
        <View
          style={[
            styles.flexRow,
            styles.alignCenter,
            styles.spaceBetween,
            styles.marginBottom,
            styles.paddingLeft,
          ]}>
          <Text variant="titleLarge">Menu</Text>
          <Button
            onPress={() => dispatch({type: 'SET_CURRENT_MODAL', payload: null})}
            icon="close"
          />
        </View>
        <Divider style={styles.marginBottom} />
        <Button
          onPress={() =>
            dispatch({type: 'SET_CURRENT_MODAL', payload: 'favorites'})
          }
          icon="heart">
          <Text>Favoritos</Text>
        </Button>
        <Button
          onPress={() =>
            dispatch({type: 'SET_CURRENT_MODAL', payload: 'history'})
          }
          icon="history">
          <Text>Histórico</Text>
        </Button>
        <Button
          onPress={() =>
            dispatch({type: 'SET_CURRENT_MODAL', payload: 'indexes'})
          }
          icon="format-list-bulleted-square">
          <Text>Índices de Assuntos</Text>
        </Button>
        <Button
          onPress={() =>
            dispatch({type: 'SET_CURRENT_MODAL', payload: 'anthems'})
          }
          icon="magnify">
          <Text>Pesquisar</Text>
        </Button>
        <Button
          onPress={() => {
            dispatch({type: 'SET_CURRENT_ANTHEM', payload: randomAnthem()});
            dispatch({type: 'SET_CURRENT_MODAL', payload: null});
          }}
          icon="shuffle-variant">
          <Text>Hino Aleatório</Text>
        </Button>
        <Divider style={styles.marginVertical} />
        <Text variant="titleMedium">Reprodução</Text>
        <Divider style={styles.marginVertical} />
        <Button
          onPress={async () => {
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
          }}
          icon={state.isPlaying ? 'stop' : 'play'}>
          <Text>{state.isPlaying ? 'Parar' : 'Reproduzir'}</Text>
        </Button>
        <Divider style={styles.marginVertical} />
        <Text variant="titleMedium">Outros</Text>
        <Divider style={styles.marginVertical} />
        <Button
          onPress={() =>
            Linking.openURL('https://github.com/rxog/harpa-crista')
          }
          icon="github">
          <Text>Sobre o App</Text>
        </Button>
        <Button
          onPress={() =>
            Linking.openURL(
              `mailto:dev@ronis.com.br?subject=Harpa Cristã: Erro no hino ${state.currentAnthem.id}`,
            )
          }
          icon="bug">
          <Text>Reportar Erro</Text>
        </Button>
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default MenuModal;
