import React from 'react';
import {Linking, TouchableHighlight, View} from 'react-native';
import {Divider, Text} from 'react-native-paper';
import {useAppContext} from '../../providers/AppProvider';
import TrackPlayer from 'react-native-track-player';
import Icon from '../Icon';
import {anthemAudioURL, randomAnthem} from '../../utils';
import BottomSheet from './BottomSheet';
import {styles} from '../../utils/theme';

const Button = ({
  onPress,
  text,
  icon,
}: {
  onPress: () => void;
  text?: string;
  icon?: string;
}) => (
  <TouchableHighlight onPress={onPress} style={styles.buttonMainMenu}>
    <View
      style={[styles.flexRow, styles.alignCenter, styles.gap, styles.padding]}>
      {icon && <Icon name={icon} size={24} />}
      {text && <Text>{text}</Text>}
    </View>
  </TouchableHighlight>
);

const MenuModal = () => {
  const {state, dispatch} = useAppContext();

  return (
    <BottomSheet name="mainMenu" snapPoints={['95%']}>
      <View style={styles.padding}>
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
          text="Favoritos"
          icon="heart"
        />
        <Button
          onPress={() =>
            dispatch({type: 'SET_CURRENT_MODAL', payload: 'history'})
          }
          text="Histórico"
          icon="history"
        />
        <Button
          onPress={() =>
            dispatch({type: 'SET_CURRENT_MODAL', payload: 'indexes'})
          }
          text="Índices de Assuntos"
          icon="format-list-bulleted-square"
        />
        <Button
          onPress={() =>
            dispatch({type: 'SET_CURRENT_MODAL', payload: 'anthems'})
          }
          text="Pesquisar"
          icon="magnify"
        />
        <Button
          onPress={() => {
            dispatch({type: 'SET_CURRENT_ANTHEM', payload: randomAnthem()});
            dispatch({type: 'SET_CURRENT_MODAL', payload: null});
          }}
          text="Hino aleatório"
          icon="shuffle-variant"
        />
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
          text={state.isPlaying ? 'Parar' : 'Reproduzir'}
          icon={state.isPlaying ? 'stop' : 'play'}
        />
        <Divider style={styles.marginVertical} />
        <Text variant="titleMedium">Outros</Text>
        <Divider style={styles.marginVertical} />
        <Button
          onPress={() =>
            Linking.openURL('https://github.com/rxog/harpa-crista')
          }
          text="Código-fonte"
          icon="github"
        />
        <Button
          onPress={() =>
            Linking.openURL(
              `mailto:dev@ronis.com.br?subject=Harpa Cristã: Erro no hino ${state.currentAnthem.id}`,
            )
          }
          text="Reportar erro"
          icon="bug"
        />
      </View>
    </BottomSheet>
  );
};

export default MenuModal;
