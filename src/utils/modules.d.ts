declare module 'react-native-simple-audio-player' {
  export type AudioPlayerProps = {
    url: string;
    style?: object;
  };

  export function AudioPlayer(props: AudioPlayerProps): JSX.Element;
}
