import React from 'react';
import {Linking, View, Text} from 'react-native';
import {useAppContext} from '../../providers/AppProvider';
import TrackPlayer from 'react-native-track-player';
import {anthemAudioURL, randomAnthem} from '../../utils';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import BottomSheet from '../BottomSheetModal';
import Button from '../Button';
import {padding, styles} from '../../utils/styles';

const MenuModal = () => {
  const {
    state: {isPlaying, currentAnthem},
    dispatch,
  } = useAppContext();

  const ButtonModal = React.useCallback(
    ({
      text,
      icon,
      modalName,
      onPress,
    }: {
      icon: string;
      text?: string;
      modalName?: string | null;
      onPress?: () => void;
    }) => {
      return (
        <Button
          onPress={() => {
            onPress && onPress();
            dispatch({type: 'SET_CURRENT_MODAL', payload: modalName || null});
          }}
          icon={icon}
          iconStyle={styles.app.menuButtonIcon}>
          {text && <Text style={styles.app.menuButtonText}>{text}</Text>}
        </Button>
      );
    },
    [dispatch],
  );

  const Subtitle = React.useCallback(({children}: {children: string}) => {
    return (
      <View style={padding(10)}>
        {<Text style={styles.app.menuSubtitle}>{children}</Text>}
      </View>
    );
  }, []);

  return (
    <BottomSheet name="mainMenu">
      <BottomSheetScrollView contentContainerStyle={styles.app.menu}>
        <ButtonModal text="Favoritos" icon="star" modalName="favorites" />
        <ButtonModal text="Histórico" icon="history" modalName="history" />
        <ButtonModal
          text="Índices de Assuntos"
          icon="format-list-bulleted-square"
          modalName="indexes"
        />
        <ButtonModal text="Pesquisar" icon="magnify" modalName="anthems" />
        <ButtonModal
          onPress={() => {
            dispatch({type: 'SET_CURRENT_ANTHEM', payload: randomAnthem()});
          }}
          text="Hino Aleatório"
          icon="shuffle-variant"
        />

        <Subtitle>Reprodução</Subtitle>
        <ButtonModal
          onPress={async () => {
            if (isPlaying) {
              await TrackPlayer.stop();
            } else {
              await TrackPlayer.load({
                url: anthemAudioURL(currentAnthem.number),
                title: currentAnthem.title,
                artist: currentAnthem.author,
              });
              await TrackPlayer.play();
            }
          }}
          icon={isPlaying ? 'stop' : 'play'}
          text={isPlaying ? 'Parar' : 'Reproduzir'}
        />

        <Subtitle>Outros</Subtitle>
        <ButtonModal
          onPress={() =>
            Linking.openURL('https://github.com/rxog/harpa-crista')
          }
          icon="github"
          text="Sobre o App"
        />
        <ButtonModal
          onPress={() =>
            Linking.openURL(
              `mailto:dev@ronis.com.br?subject=Harpa Cristã: Erro no hino ${currentAnthem.number}`,
            )
          }
          icon="bug"
          text="Reportar erro"
        />
      </BottomSheetScrollView>
    </BottomSheet>
  );
};

export default MenuModal;
