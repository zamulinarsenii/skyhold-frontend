import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import logsReducer from './slices/logsSlice';
import selectorReducer from './slices/selectorSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    logs: logsReducer,
    selector: selectorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;