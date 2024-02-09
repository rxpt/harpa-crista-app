import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  Dispatch,
} from 'react';
import {setupPlayer} from '../services';
import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV();

interface State {
  playerReady: boolean;
  fontSize: number;
  minFontSize: number;
  maxFontSize: number;
  favorites: number[];
  history: number[];
}

type Action =
  | {type: 'SET_FONT_SIZE'; payload: number}
  | {type: 'SET_PLAYER_READY'; payload: boolean}
  | {type: 'ADD_FAVORITE'; payload: number}
  | {type: 'REMOVE_FAVORITE'; payload: number}
  | {type: 'ADD_HISTORY'; payload: number};

const initialState: State = {
  playerReady: false,
  minFontSize: 16,
  maxFontSize: 32,
  fontSize: storage.getNumber('fontSize') ?? 16,
  favorites: JSON.parse(storage.getString('favorites') ?? '[]'),
  history: [],
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
      ];
      return {
        ...state,
        history: addHistory,
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
