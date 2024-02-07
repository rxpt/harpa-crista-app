import React, {createContext, useReducer, useContext, Dispatch} from 'react';
import {Search} from '../components/Search';
import {BackToTop} from '../components/BackToTop';

export const initialState = {
  scrollY: 0,
  scrollRef: null,
  searchRef: null,
  showSearch: true,
  searchQuery: '',
  fontSize: 16,
};

export const ActionType = {
  scroll: 'scroll',
  scrollRef: 'scrollRef',
  searchRef: 'searchRef',
  showSearch: 'showSearch',
  searchQuery: 'searchQuery',
  fontSize: 'fontSize',
};

export type State = typeof initialState;

export type Action = {
  type: string;
  payload: any;
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'scroll':
      return {...state, scrollY: action.payload};
    case 'scrollRef':
      return {...state, scrollRef: action.payload};
    case 'searchRef':
      return {...state, searchRef: action.payload};
    case 'showSearch':
      return {...state, showSearch: action.payload};
    case 'searchQuery':
      return {...state, searchQuery: action.payload};
    case 'fontSize':
      return {...state, fontSize: action.payload};

    default:
      throw new Error();
  }
};

export const actions = {
  scroll: (payload: number) => ({type: ActionType.scroll, payload}),
  scrollRef: (payload: any) => ({type: ActionType.scrollRef, payload}),
  searchRef: (payload: any) => ({type: ActionType.searchRef, payload}),
  showSearch: (payload: boolean) => ({type: ActionType.showSearch, payload}),
  searchQuery: (payload: string) => ({type: ActionType.searchQuery, payload}),
  fontSize: (payload: number) => ({type: ActionType.fontSize, payload}),
};

const AppContext = createContext({
  state: initialState,
  dispatch: (() => null) as Dispatch<any>,
});

const AppProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{state, dispatch}}>
      <Search />
      {children}
      <BackToTop />
    </AppContext.Provider>
  );
};

const useAppContext = () => useContext(AppContext);

export {AppProvider, useAppContext};
