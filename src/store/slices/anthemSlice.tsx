import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getJSON, setJSON} from '../storage';
import axios from 'axios';
import {IAnthem, IHistory} from '../../utils';
import anthems from '../../data/anthems.json';
import lodash from 'lodash';

interface AnthemState {
  anthems: IAnthem[];
  history: IHistory[];
  favorites: number[];
  current: IAnthem | null;
  loading: 'idle' | 'pending';
  error: string | null;
}

const initialState: AnthemState = {
  anthems: anthems,
  history: getJSON('history') || [],
  favorites: getJSON('favorites') || [],
  current: lodash.sample(anthems) as IAnthem,
  loading: 'idle',
  error: null,
};

export const updateAnthems = createAsyncThunk<
  IAnthem[],
  null,
  {rejectValue: string}
>('anthem/updateAnthems', async (_, {rejectWithValue}) => {
  try {
    const response = await axios.get<IAnthem[]>(
      'https://harpa-crista-backend.vercel.app/api/anthems',
    );
    return response.data;
  } catch (error) {
    return rejectWithValue('Failed to fetch anthems.');
  }
});

const anthemSlice = createSlice({
  name: 'anthem',
  initialState,
  reducers: {
    removeCurrentAnthem: state => {
      state.current = null;
    },
    setCurrentAnthem: (state, action) => {
      state.current = action.payload as IAnthem;
      const newHistoryItem = {
        id: state.current?.number as number,
        at: new Date().toISOString(),
      };
      state.history = [newHistoryItem, ...state.history]
        .filter((item, index, self) => {
          return (
            index ===
            self.findIndex(t => {
              return t.id === item.id;
            })
          );
        })
        .slice(0, 10);
      setJSON('history', state.history);
    },
    toggleFavorite: state => {
      if (state.favorites.includes(state.current?.number as number)) {
        state.favorites = state.favorites.filter(
          favorite => favorite !== state.current?.number,
        );
      } else {
        state.favorites.push(state.current?.number as number);
      }
      setJSON('favorites', state.favorites);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateAnthems.pending, state => {
        state.loading = 'pending';
      })
      .addCase(updateAnthems.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.anthems = action.payload;
        state.error = null;
      })
      .addCase(updateAnthems.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload as string;
      });
  },
});

export const {toggleFavorite, removeCurrentAnthem, setCurrentAnthem} =
  anthemSlice.actions;

export const anthemActions = anthemSlice.actions;

export default anthemSlice.reducer;
