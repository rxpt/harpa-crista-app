import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  Dispatch,
} from 'react';
import {MMKV} from 'react-native-mmkv';
import {setupPlayer} from '../services';
import {getAnthem} from '../utils';
import {Anthem} from '../utils/interfaces';
import {useProgress, useIsPlaying} from 'react-native-track-player';

export const storage = new MMKV();

interface State {
  playerReady: boolean;
  fontSize: number;
  minFontSize: number;
  maxFontSize: number;
  favorites: number[];
  history: number[];
  searchIndex: number;
  searchQuery: string;
  searchResults: Anthem[];
  currentAnthem: Anthem;
  currentModal: string | null;
  trackProgress: {
    position: number;
    duration: number;
  };
  isPlaying: boolean;
  bottomMenu: boolean;
}

type Action =
  | {type: 'SET_FONT_SIZE'; payload: number}
  | {type: 'SET_PLAYER_READY'; payload: boolean}
  | {type: 'ADD_FAVORITE'; payload: number}
  | {type: 'REMOVE_FAVORITE'; payload: number}
  | {type: 'ADD_HISTORY'; payload: number}
  | {type: 'SET_SEARCH_INDEX'; payload: number}
  | {type: 'SET_SEARCH_QUERY'; payload: string}
  | {type: 'SET_SEARCH_RESULTS'; payload: Anthem[]}
  | {type: 'SET_CURRENT_ANTHEM'; payload: Anthem}
  | {type: 'SET_CURRENT_MODAL'; payload: string | null}
  | {type: 'SET_TRACK_PROGRESS'; payload: {position: number; duration: number}}
  | {type: 'SET_IS_PLAYING'; payload: boolean}
  | {type: 'SET_BOTTOM_MENU'; payload: boolean};

const initialState: State = {
  playerReady: false,
  minFontSize: 16,
  maxFontSize: 32,
  fontSize: storage.getNumber('fontSize') ?? 16,
  favorites: JSON.parse(storage.getString('favorites') ?? '[]'),
  history: JSON.parse(storage.getString('history') ?? '[]'),
  searchIndex: -1,
  searchQuery: '',
  searchResults: [],
  currentAnthem:
    JSON.parse(storage.getString('currentAnthem') ?? 'null') ?? getAnthem(1),
  currentModal: null,
  trackProgress: {
    position: 0,
    duration: 0,
  },
  isPlaying: false,
  bottomMenu: false,
};

const reducer = (state: State, action: Action): State => {
  const {type, payload} = action;
  switch (type) {
    case 'SET_FONT_SIZE':
      const fontSize = Math.min(
        Math.max(action.payload, state.minFontSize),
        state.maxFontSize,
      );
      storage.set('fontSize', fontSize);
      return {
        ...state,
        fontSize: fontSize,
      };
    case 'SET_PLAYER_READY':
      return {
        ...state,
        playerReady: payload,
      };
    case 'ADD_FAVORITE':
      const addFavorites = [...state.favorites, payload];
      storage.set('favorites', JSON.stringify(addFavorites));
      return {
        ...state,
        favorites: addFavorites,
      };
    case 'REMOVE_FAVORITE':
      const removeFavorites = state.favorites.filter(
        favorite => favorite !== payload,
      );
      storage.set('favorites', JSON.stringify(removeFavorites));
      return {
        ...state,
        favorites: removeFavorites,
      };
    case 'ADD_HISTORY':
      const addHistory = [
        payload,
        ...state.history.filter(id => id !== payload),
      ].slice(0, 10);
      storage.set('history', JSON.stringify(addHistory));
      return {
        ...state,
        history: addHistory,
      };
    case 'SET_SEARCH_INDEX':
      return {
        ...state,
        searchIndex: payload,
      };
    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: payload,
      };
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: payload,
      };
    case 'SET_CURRENT_ANTHEM':
      storage.set('currentAnthem', JSON.stringify(payload));
      return {
        ...state,
        currentAnthem: payload,
      };
    case 'SET_CURRENT_MODAL':
      return {
        ...state,
        currentModal: payload,
      };
    case 'SET_TRACK_PROGRESS':
      return {
        ...state,
        trackProgress: payload,
      };
    case 'SET_IS_PLAYING':
      return {
        ...state,
        isPlaying: payload,
      };
    case 'SET_BOTTOM_MENU':
      return {
        ...state,
        bottomMenu: payload,
      };

    default:
      throw new Error(`Ação desconhecida: ${type}`);
  }
};

const AppContext = createContext<{state: State; dispatch: Dispatch<Action>}>({
  state: initialState,
  dispatch: () => null,
});

export const AppProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {playing} = useIsPlaying();
  const progress = useProgress();

  useEffect(() => {
    dispatch({
      type: 'SET_TRACK_PROGRESS',
      payload: {
        position: progress.position,
        duration: progress.duration,
      },
    });
  }, [progress.duration, progress.position]);

  useEffect(() => {
    dispatch({type: 'SET_IS_PLAYING', payload: playing || false});
  }, [playing]);

  useEffect(() => {
    dispatch({type: 'ADD_HISTORY', payload: state.currentAnthem.id});
  }, [state.currentAnthem.id]);

  useEffect(() => {
    const initializePlayer = async () => {
      try {
        const isReady = await setupPlayer();
        dispatch({type: 'SET_PLAYER_READY', payload: isReady});
      } catch (error) {
        console.error('Erro ao configurar o player:', error);
      }
    };

    initializePlayer();
  }, []);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
