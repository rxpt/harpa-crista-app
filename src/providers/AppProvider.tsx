import React, {
  createContext,
  useReducer,
  useContext,
  Dispatch,
  useEffect,
} from 'react';
import {setupPlayer} from '../services';

const initialState = {
  fontSize: 16,
  playerReady: false,
};

type State = typeof initialState;

type Action = {
  type: string;
  payload: any;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'fontSize':
      return {...state, fontSize: action.payload};
    case 'playerReady':
      return {...state, playerReady: action.payload};

    default:
      throw new Error();
  }
};

const AppContext = createContext({
  state: initialState,
  dispatch: (() => null) as Dispatch<any>,
});

export const ActionType = {
  fontSize: 'fontSize',
  playerReady: 'playerReady',
};

export const AppProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setupPlayer().then(isReady => {
      dispatch({type: ActionType.playerReady, payload: isReady});
    });
  }, []);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
