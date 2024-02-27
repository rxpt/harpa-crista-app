import React from 'react';
import {Linking, View, Text} from 'react-native';
import TrackPlayer, {useIsPlaying} from 'react-native-track-player';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Button from '../Button';
import {padding, styles} from '../../utils/styles';
import {useAnthemHooks, useNavigationHooks} from '../../store/hooks';
import ModalTitle from '../ModalTitle';

const MenuModal = () => {
  const {clearModals, openModal} = useNavigationHooks();
  const anthemHooks = useAnthemHooks();
  const currentAnthem = anthemHooks.getCurrent();
  const isPlaying = useIsPlaying().playing;

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
            modalName ? openModal(modalName) : clearModals();
          }}
          icon={icon}
          iconStyle={styles.app.menuButtonIcon}>
          {text && <Text style={styles.app.menuButtonText}>{text}</Text>}
        </Button>
      );
    },
    [clearModals, openModal],
  );

  const Subtitle = React.useCallback(({children}: {children: string}) => {
    return (
      <View style={padding(10)}>
        {<ModalTitle subtitle={children} goBack={false} />}
      </View>
    );
  }, []);

  return (
    <BottomSheetScrollView contentContainerStyle={styles.app.menu}>
      <View style={padding(10)}>
        <ModalTitle title="Menu" goBack={false} />
      </View>
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
          anthemHooks.setRandom();
        }}
        text="Hino Aleatório"
        icon="shuffle-variant"
      />

      {currentAnthem && (
        <React.Fragment>
          <Subtitle>Reprodução</Subtitle>
          <ButtonModal
            onPress={async () => {
              if (isPlaying) {
                await TrackPlayer.stop();
              } else {
                await TrackPlayer.load({
                  url: anthemHooks.currentAudioURL() as string,
                  title: currentAnthem.title,
                  artist: currentAnthem.author,
                });
                await TrackPlayer.play();
              }
            }}
            icon={isPlaying ? 'stop' : 'play'}
            text={isPlaying ? 'Parar' : 'Reproduzir'}
          />
        </React.Fragment>
      )}

      <Subtitle>Outros</Subtitle>
      <ButtonModal
        onPress={() => Linking.openURL('https://github.com/rxog/harpa-crista')}
        icon="github"
        text="Sobre o App"
      />
      <ButtonModal
        onPress={() =>
          Linking.openURL(
            'mailto:dev@ronis.com.br?subject=Harpa Cristã: Encotrei um erro&body=Olá, encontrei um erro no aplicativo Harpa Cristã:',
          )
        }
        icon="bug"
        text="Reportar erro"
      />
    </BottomSheetScrollView>
  );
};

export default MenuModal;
