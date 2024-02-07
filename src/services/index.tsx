import TrackPlayer, {
  AppKilledPlaybackBehavior,
  Capability,
  Event,
} from 'react-native-track-player';

export const setupPlayer = async () => {
  let isSetup = false;
  try {
    await TrackPlayer.reset();
    isSetup = true;
  } catch {
    await TrackPlayer.setupPlayer();
    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior:
          AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.Stop,
        Capability.SeekTo,
      ],
      compactCapabilities: [Capability.Play, Capability.Pause, Capability.Stop],
      progressUpdateEventInterval: 2,
    });

    isSetup = true;
  } finally {
    return isSetup;
  }
};

export const PlaybackService = async () => {
  TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play());
  TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause());
  TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.stop());
  TrackPlayer.addEventListener(Event.RemoteSeek, e => {
    if (e.position) {
      TrackPlayer.seekTo(e.position);
    }
  });
};
