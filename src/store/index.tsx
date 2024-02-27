import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import anthemSlice from './slices/anthemSlice';
import configSlice from './slices/configSlice';
import navigationReducer from './slices/navigationSlice';

export const store = configureStore({
  reducer: {
    anthem: anthemSlice,
    config: configSlice,
    navigation: navigationReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
