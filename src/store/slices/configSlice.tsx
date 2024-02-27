import {createSlice} from '@reduxjs/toolkit';
import {storage} from '../storage';

interface AppConfigState {
  fontSize: number;
  minFontSize: number;
  maxFontSize: number;
}

const initialState: AppConfigState = {
  fontSize: storage.getNumber('fontSize') ?? 18,
  minFontSize: 16,
  maxFontSize: 48,
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setFontSize: (state, action) => {
      const size = Math.min(
        Math.max(action.payload, state.minFontSize),
        state.maxFontSize,
      );
      state.fontSize = size;
      storage.set('fontSize', state.fontSize);
    },
  },
});

export const configActions = configSlice.actions;

export default configSlice.reducer;
