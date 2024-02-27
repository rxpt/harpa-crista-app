import {createSlice} from '@reduxjs/toolkit';
import lodash from 'lodash';

interface NavigateToAction {
  name: string;
  params?: object;
}

interface NavigateActionPayload {
  type: string;
  payload: NavigateToAction;
}

interface NavigationState {
  screens: {
    history: NavigateToAction[];
    current: NavigateToAction | null;
  };
  modals: {
    history: NavigateToAction[];
    current: NavigateToAction | null;
  };
  search: {
    query: string;
    typing: boolean;
    visible: boolean;
    disabled: boolean;
  };
  isKeyboardVisible: boolean;
}

const initialState: NavigationState = {
  screens: {
    history: [],
    current: null,
  },
  modals: {
    history: [],
    current: null,
  },
  search: {
    query: '',
    typing: false,
    visible: false,
    disabled: false,
  },
  isKeyboardVisible: false,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    navigateTo: (state, action: NavigateActionPayload) => {
      const {name, params} = action.payload;
      const current = {name, params};
      state.screens.history.push(current);
      state.screens.current = current;
    },
    navigateBack: state => {
      state.screens.history.pop();
      state.screens.current = lodash.last(state.screens.history) || null;
    },
    navigateReset: state => {
      state.screens = initialState.screens;
    },
    setScreenParams: (state, action) => {
      if (state.screens.current) {
        state.screens.current.params = action.payload;
      }
    },
    modalOpen: (state, action) => {
      const {name, params} = action.payload;
      const current = {name, params};
      state.modals.history.push(current);
      state.modals.current = current;
    },
    modalBack: state => {
      state.modals.history.pop();
      state.modals.current = lodash.last(state.modals.history) || null;
    },
    modalReset: state => {
      state.modals = initialState.modals;
    },
    setModalParams: (state, action) => {
      if (state.modals.current) {
        state.modals.current.params = action.payload;
      }
    },
    setSearch: (state, action) => {
      state.search.query = action.payload.query;
      state.search.typing = action.payload.typing;
      state.search.visible = action.payload.visible;
      state.search.disabled = action.payload.disabled;
    },
    setSearchQuery: (state, action) => {
      state.search.query = action.payload;
    },
    setSearchVisible: (state, action) => {
      state.search.visible = action.payload;
    },
    setSearchTyping: (state, action) => {
      state.search.typing = action.payload;
    },
    setSearchDisabled: (state, action) => {
      state.search.disabled = action.payload;
    },
    searchReset: state => {
      state.search = initialState.search;
    },
    setKeyboardVisible: (state, action) => {
      state.isKeyboardVisible = action.payload;
    },
  },
});

export const navigationActions = navigationSlice.actions;

export default navigationSlice.reducer;
