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
    history: string[];
    current: string | null;
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
      state.screens.history = [];
      state.screens.current = null;
    },
    setScreenParams: (state, action) => {
      if (state.screens.current) {
        state.screens.current.params = action.payload;
      }
    },
    openModal: (state, action) => {
      state.modals.history.push(action.payload);
      state.modals.current = action.payload;
    },
    closeModal: state => {
      state.modals.history.pop();
      state.modals.current = lodash.last(state.modals.history) || null;
    },
    clearModals: state => {
      state.modals.history = [];
      state.modals.current = null;
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
    setKeyboardVisible: (state, action) => {
      state.isKeyboardVisible = action.payload;
    },
  },
});

export const navigationActions = navigationSlice.actions;

export default navigationSlice.reducer;
